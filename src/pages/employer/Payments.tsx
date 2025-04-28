import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface Payment {
  id: string;
  studentName: string;
  taskTitle: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  paymentMethod: string;
}

export default function Payments() {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      studentName: 'John Doe',
      taskTitle: 'Build a React E-commerce Website',
      amount: 500,
      status: 'completed',
      date: '2024-03-15',
      paymentMethod: 'Credit Card',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      taskTitle: 'Create a Mobile App UI Design',
      amount: 300,
      status: 'pending',
      date: '2024-03-14',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      taskTitle: 'Develop a REST API',
      amount: 400,
      status: 'failed',
      date: '2024-03-13',
      paymentMethod: 'PayPal',
    },
  ]);

  const [newPayment, setNewPayment] = useState({
    studentName: '',
    taskTitle: '',
    amount: '',
    paymentMethod: '',
  });

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with a payment gateway
    toast({
      title: 'Payment initiated',
      description: 'Your payment has been initiated and is being processed.',
    });
    // Reset form
    setNewPayment({
      studentName: '',
      taskTitle: '',
      amount: '',
      paymentMethod: '',
    });
  };

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'completed':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
    }
  };

  const user = {
    name: 'Tech Solutions Inc.',
    email: 'contact@techsolutions.com',
    avatar: undefined,
  };

  return (
    <DashboardLayout role="employer" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Payments</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{payment.studentName}</h3>
                        <p className="text-sm text-gray-500">{payment.taskTitle}</p>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm">Amount: ${payment.amount}</p>
                        <p className="text-sm text-gray-500">
                          Date: {payment.date}
                        </p>
                        <p className="text-sm text-gray-500">
                          Method: {payment.paymentMethod}
                        </p>
                      </div>
                      {payment.status === 'failed' && (
                        <Button variant="default" size="sm">
                          Retry Payment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {payments
              .filter(payment => payment.status === 'pending')
              .map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{payment.studentName}</h3>
                          <p className="text-sm text-gray-500">{payment.taskTitle}</p>
                        </div>
                        {getStatusBadge(payment.status)}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Amount: ${payment.amount}</p>
                          <p className="text-sm text-gray-500">
                            Date: {payment.date}
                          </p>
                          <p className="text-sm text-gray-500">
                            Method: {payment.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {payments
              .filter(payment => payment.status === 'completed')
              .map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{payment.studentName}</h3>
                          <p className="text-sm text-gray-500">{payment.taskTitle}</p>
                        </div>
                        {getStatusBadge(payment.status)}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Amount: ${payment.amount}</p>
                          <p className="text-sm text-gray-500">
                            Date: {payment.date}
                          </p>
                          <p className="text-sm text-gray-500">
                            Method: {payment.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Make a New Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    value={newPayment.studentName}
                    onChange={(e) => setNewPayment({ ...newPayment, studentName: e.target.value })}
                    placeholder="Enter student name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taskTitle">Task Title</Label>
                  <Input
                    id="taskTitle"
                    value={newPayment.taskTitle}
                    onChange={(e) => setNewPayment({ ...newPayment, taskTitle: e.target.value })}
                    placeholder="Enter task title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    placeholder="Enter amount"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={newPayment.paymentMethod}
                    onValueChange={(value) => setNewPayment({ ...newPayment, paymentMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Process Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 