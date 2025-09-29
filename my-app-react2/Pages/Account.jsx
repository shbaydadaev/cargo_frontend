import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User as UserIcon, Lock, Bell, LogOut, Save, Phone, FileText, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    passport_number: '',
    passport_country: '',
    passport_expiry: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);
      setFormData({
        full_name: userData.full_name || '',
        email: userData.email || '',
        phone_number: userData.phone_number || '',
        date_of_birth: userData.date_of_birth || '',
        passport_number: userData.passport_number || '',
        passport_country: userData.passport_country || '',
        passport_expiry: userData.passport_expiry || ''
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    }
    setIsLoading(false);
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updateData = { ...formData };
      delete updateData.email; // Email cannot be updated
      await User.updateMyUserData(updateData);
      await loadUser();
    } catch (error) {
      console.error("Error saving user data:", error);
    }
    setIsSaving(false);
  };
  
  const handleLogout = async () => {
    await User.logout();
    window.location.reload();
  };

  const isPassportComplete = formData.passport_number && formData.passport_country && formData.passport_expiry;

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-600 mt-1">Manage your personal information and preferences.</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="passport" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Passport Details
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <p className="text-sm text-slate-500">Update your basic account information.</p>
              </CardHeader>
              <form onSubmit={handleSave}>
                <CardContent className="space-y-6">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="full_name">Full Name *</Label>
                          <Input 
                            id="full_name" 
                            name="full_name" 
                            value={formData.full_name} 
                            onChange={handleChange} 
                            required
                          />
                          <p className="text-xs text-slate-500">Must match your passport name</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            disabled 
                            className="bg-slate-50"
                          />
                          <p className="text-xs text-slate-500">Email address cannot be changed</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone_number">Phone Number *</Label>
                          <Input 
                            id="phone_number" 
                            name="phone_number" 
                            value={formData.phone_number} 
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                            required
                          />
                          <p className="text-xs text-slate-500">For shipping notifications</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date_of_birth">Date of Birth *</Label>
                          <Input 
                            id="date_of_birth" 
                            name="date_of_birth" 
                            type="date" 
                            value={formData.date_of_birth} 
                            onChange={handleChange}
                            required
                          />
                          <p className="text-xs text-slate-500">Must match your passport</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <div className="p-6 border-t flex justify-end">
                  <Button type="submit" disabled={isSaving || isLoading}>
                    <Save className="w-4 h-4 mr-2"/>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="passport">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Passport Information
                </CardTitle>
                <p className="text-sm text-slate-500">Required for international shipping and customs clearance.</p>
                
                {!isPassportComplete && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-700">Passport information is required for international shipping</span>
                  </div>
                )}
              </CardHeader>
              <form onSubmit={handleSave}>
                <CardContent className="space-y-6">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="passport_number">Passport Number *</Label>
                        <Input 
                          id="passport_number" 
                          name="passport_number" 
                          value={formData.passport_number} 
                          onChange={handleChange}
                          placeholder="A12345678"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="passport_country">Issuing Country *</Label>
                          <Input 
                            id="passport_country" 
                            name="passport_country" 
                            value={formData.passport_country} 
                            onChange={handleChange}
                            placeholder="United States"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passport_expiry">Expiry Date *</Label>
                          <Input 
                            id="passport_expiry" 
                            name="passport_expiry" 
                            type="date" 
                            value={formData.passport_expiry} 
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Why do we need this information?</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Required for customs declarations</li>
                          <li>• Ensures smooth international shipping</li>
                          <li>• Helps prevent delays at customs</li>
                          <li>• Your information is encrypted and secure</li>
                        </ul>
                      </div>
                    </>
                  )}
                </CardContent>
                <div className="p-6 border-t flex justify-end">
                  <Button type="submit" disabled={isSaving || isLoading}>
                    <Save className="w-4 h-4 mr-2"/>
                    {isSaving ? 'Saving...' : 'Save Passport Info'}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">Password</h3>
                      <p className="text-sm text-slate-500">Managed through Google authentication</p>
                    </div>
                    <Button variant="outline" disabled>
                      <Lock className="w-4 h-4 mr-2" />
                      Managed by Google
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">Notifications</h3>
                      <p className="text-sm text-slate-500">Email and SMS notifications</p>
                    </div>
                    <Button variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-red-900">Sign Out</h3>
                      <p className="text-sm text-red-600">Sign out of your Active Cargo account</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}