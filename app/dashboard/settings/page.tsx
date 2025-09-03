"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save, Building2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()
  const [companyName, setCompanyName] = useState("")
  const [companyDescription, setCompanyDescription] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  useEffect(() => {
    const savedSettings = localStorage.getItem("companySettings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setCompanyName(settings.companyName || "")
      setCompanyDescription(settings.companyDescription || "")
      setLogoPreview(settings.logoPreview || null)
    }
  }, [])

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSettings = () => {
    const settings = {
      companyName,
      companyDescription,
      logoPreview,
    }
    localStorage.setItem("companySettings", JSON.stringify(settings))

    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات الشركة بنجاح",
    })
  }

  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">هذه الصفحة متاحة للمديرين فقط</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة إعدادات النظام والشركة</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            الإعدادات العامة
          </CardTitle>
          <CardDescription>معلومات الشركة التي ستظهر في التقارير المطبوعة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">اسم الشركة</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="أدخل اسم الشركة أو المحل التجاري"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyDescription">وصف الشركة</Label>
            <Textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              placeholder="أدخل وصفاً موجزاً عن نشاط الشركة"
              className="text-right min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyLogo">شعار الشركة</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  id="companyLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="cursor-pointer"
                />
              </div>
              {logoPreview ? (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={logoPreview}
                    alt="معاينة الشعار"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-xs text-muted-foreground">لا توجد صورة</div>
                </div>
              )}
            </div>
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            <Save className="h-4 w-4 ml-2" />
            حفظ الإعدادات
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}