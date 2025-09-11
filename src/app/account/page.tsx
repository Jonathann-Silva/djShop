import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, MapPin, User, LogOut } from "lucide-react";

// Mock data for demonstration
const user = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
};

const addresses = [
  {
    id: 1,
    type: "Home",
    street: "123 Perfume Lane",
    city: "Scent City, ST 12345",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    street: "456 Fragrance Ave",
    city: "Aroma Town, AT 67890",
    isDefault: false,
  },
];

const orders = [
  {
    id: "ORD-001",
    date: "2023-10-26",
    total: 180.0,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2023-11-15",
    total: 220.0,
    status: "Shipped",
  },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-headline font-bold">My Account</h1>
          <p className="text-muted-foreground">
            Manage your information, addresses, and orders.
          </p>
        </div>
         <Button variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="secondary">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Saved Addresses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      {address.type}{" "}
                      {address.isDefault && (
                        <span className="text-xs bg-primary/20 text-primary-dark font-medium px-2 py-0.5 rounded-full ml-2">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.street}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
             <Button variant="secondary">Add New Address</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order, index) => (
                <>
                  <div key={order.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Date: {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="font-semibold">${order.total.toFixed(2)}</p>
                       <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-amber-600'}`}>{order.status}</p>
                    </div>
                  </div>
                  {index < orders.length -1 && <Separator />}
                </>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
