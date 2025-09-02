import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RegisterForm } from '@/components/register-form';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Register</CardTitle>
          <CardDescription>
            Create an account to start shopping.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
