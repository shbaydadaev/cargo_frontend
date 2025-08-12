// --- Page Navigation ---
const navLinks = document.querySelectorAll('#sidebar-nav .sidebar-link');
const mainViews = document.querySelectorAll('.main-view');
const activeLinkClasses = ['bg-blue-600', 'text-white'];
const inactiveLinkClasses = ['text-slate-600', 'hover:bg-slate-100'];

function showView(viewId) {
    mainViews.forEach(view => {
        view.classList.add('hidden');
    });
    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.classList.remove('hidden');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = e.currentTarget.id.replace('-link', '-view');
        
        navLinks.forEach(nav => {
            nav.classList.remove(...activeLinkClasses);
            nav.classList.add(...inactiveLinkClasses);
        });
        e.currentTarget.classList.add(...activeLinkClasses);
        e.currentTarget.classList.remove(...inactiveLinkClasses);

        showView(viewId);
    });
});

document.getElementById('dashboard-link').classList.add(...activeLinkClasses);
document.getElementById('dashboard-link').classList.remove(...inactiveLinkClasses);
showView('dashboard-view');


// --- Tab Functionality ---
const tabButtons = document.querySelectorAll('.tab-btn');
const activeTabClasses = ['bg-blue-600', 'text-white', 'shadow'];
const inactiveTabClasses = ['bg-white', 'text-slate-600', 'hover:bg-slate-100'];

tabButtons.forEach(button => {
    button.style.transition = 'all 0.2s ease-in-out';
    button.classList.add('px-4', 'py-2', 'text-sm', 'font-medium', 'rounded-md', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-blue-500');
});

function handleTabClick(event) {
    tabButtons.forEach(btn => {
        btn.classList.remove(...activeTabClasses);
        btn.classList.add(...inactiveTabClasses);
    });
    const clickedButton = event.currentTarget;
    clickedButton.classList.add(...activeTabClasses);
    clickedButton.classList.remove(...inactiveTabClasses);
}

tabButtons.forEach(button => {
    button.addEventListener('click', handleTabClick);
});

const initialActiveTab = document.querySelector('.tab-btn.active-tab');
if (initialActiveTab) {
    initialActiveTab.classList.remove(...inactiveTabClasses);
    initialActiveTab.classList.add(...activeTabClasses);
}

// --- Modal Functionality ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.remove('scale-95');
            modal.querySelector('.modal-content').classList.add('scale-100');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.querySelector('.modal-content').classList.remove('scale-100');
        modal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 200);
    }
}

// Event Listeners for standard modals
document.getElementById('createParcelBtn').addEventListener('click', () => openModal('parcelModal'));
document.querySelectorAll('.createOrderBtn').forEach(btn => {
    btn.addEventListener('click', () => openModal('orderModal'));
});
document.getElementById('addFundsBtn').addEventListener('click', () => openModal('addFundsModal'));

document.getElementById('closeParcelModal').addEventListener('click', () => closeModal('parcelModal'));
document.getElementById('closeOrderModal').addEventListener('click', () => closeModal('orderModal'));

// Close modal by clicking on the background overlay
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target.id === modal.id) {
            closeModal(modal.id);
        }
    });
});

// --- Gemini API Integration ---
const apiKey = ""; // API key will be injected by the environment.
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

async function callGemini(prompt, generationConfig = null) {
    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    };
    if(generationConfig) {
        payload.generationConfig = generationConfig;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
    } else {
        console.error("Unexpected API response structure:", result);
        throw new Error("Could not extract text from API response.");
    }
}

// --- Create Order Modal Logic ---
const orderItemsContainer = document.getElementById('orderItemsContainer');
const addOrderItemBtn = document.getElementById('addOrderItemBtn');
const orderTotalEl = document.getElementById('orderTotal');

function calculateOrderTotal() {
    let total = 0;
    document.querySelectorAll('.order-item').forEach(item => {
        const price = parseFloat(item.querySelector('.product-price').value) || 0;
        const quantity = parseInt(item.querySelector('.product-quantity').value) || 0;
        total += price * quantity;
    });
    orderTotalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function addOrderItem() {
    const firstItem = orderItemsContainer.querySelector('.order-item');
    const newItem = firstItem.cloneNode(true);
    
    newItem.querySelectorAll('input, select').forEach(input => {
        if(input.type === 'number') {
            input.value = input.classList.contains('product-quantity') ? '1' : '0';
        } else {
            input.value = '';
        }
    });

    const removeBtn = newItem.querySelector('.remove-item-btn');
    removeBtn.classList.remove('hidden');
    
    orderItemsContainer.appendChild(newItem);
    calculateOrderTotal();
}

orderItemsContainer.addEventListener('click', async (e) => {
    if (e.target.closest('.remove-item-btn')) {
        e.target.closest('.order-item').remove();
        calculateOrderTotal();
    }

    const fetchBtn = e.target.closest('.fetch-details-btn');
    if (fetchBtn) {
        const itemDiv = fetchBtn.closest('.order-item');
        const productLinkInput = itemDiv.querySelector('.product-link');
        const productLink = productLinkInput.value;
        if (!productLink) {
            alert('Please enter a product link first.');
            return;
        }
        
        const loader = itemDiv.querySelector('.gemini-loader-order');
        loader.classList.remove('hidden');
        loader.classList.add('flex');
        fetchBtn.disabled = true;

        const prompt = `Based on this product URL, generate a JSON object with dummy data for the following fields: productName (string), price (number, between 10-200), color (string), size (string, e.g., "Medium", "L", "10"). URL: ${productLink}. Respond with only the raw JSON object.`;
        const generationConfig = { responseMimeType: "application/json" };

        try {
            const responseText = await callGemini(prompt, generationConfig);
            const productData = JSON.parse(responseText);
            
            itemDiv.querySelector('.product-name').value = productData.productName || '';
            itemDiv.querySelector('.product-price').value = productData.price || '';
            itemDiv.querySelector('.product-color').value = productData.color || '';
            itemDiv.querySelector('.product-size').value = productData.size || '';
            itemDiv.querySelector('.product-quantity').value = 1;

            calculateOrderTotal();
        } catch (error) {
            console.error('Error fetching product details:', error);
            alert('Sorry, we could not fetch the product details. Please fill them in manually.');
        } finally {
            loader.classList.add('hidden');
            loader.classList.remove('flex');
            fetchBtn.disabled = false;
        }
    }
});

addOrderItemBtn.addEventListener('click', addOrderItem);
orderItemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('product-price') || e.target.classList.contains('product-quantity')) {
        calculateOrderTotal();
    }
});


// --- Smart Status Update ---
const parcelsTable = document.getElementById('parcelsTable');
const smartStatusModal = document.getElementById('smartStatusModal');
const smartStatusContent = document.getElementById('smartStatusContent');

parcelsTable.addEventListener('click', async (e) => {
    const smartBtn = e.target.closest('.smart-status-btn');
    if (smartBtn) {
        const row = smartBtn.closest('tr');
        const trackingId = row.cells[0].textContent;
        const from = row.cells[1].textContent;
        const to = row.cells[2].textContent;
        const status = row.querySelector('.status-badge').textContent.trim();

        smartStatusContent.innerHTML = `<div class="flex items-center justify-center h-24"><div class="loader"></div></div>`;
        openModal('smartStatusModal');
        
        const prompt = `Generate a friendly, one-sentence status update for a parcel with the following details: Tracking ID: ${trackingId}, From: ${from}, To: ${to}, Current Status: "${status}". Make it sound like a helpful assistant providing a more detailed, imaginative update.`;

        try {
            const smartUpdateText = await callGemini(prompt);
            smartStatusContent.textContent = smartUpdateText;
        } catch (error) {
            console.error('Error getting smart status:', error);
            smartStatusContent.textContent = 'Could not retrieve smart status. Please try again later.';
        }
    }
});