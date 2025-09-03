"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"
import { useAuth } from "@/components/auth-context"

export default function UsersPage() {
  const { user } = useAuth()

  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Alert className="max-w-md">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-right">
            هذه الصفحة متاحة للمديرين فقط. ليس لديك صلاحية للوصول إلى إدارة الموظفين.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-foreground">إدارة الموظفين</h1>
        <p className="text-muted-foreground mt-2">إدارة حسابات موظفي النظام (خاصة بالمدير فقط)</p>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            هذه الصفحة تحتاج إلى اتصال بقاعدة البيانات لإدارة المستخدمين.
            <br />
            في النسخة التجريبية، يمكنك استخدام الحسابات المتاحة في صفحة تسجيل الدخول.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}