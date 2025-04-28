import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, XCircle, Download } from 'lucide-react';

interface Payment {
  id: string;
  employerName: string;
  taskTitle: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  paymentMethod: string;
  invoiceUrl?: string;
}

export default function Payments() {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      employerName: 'Tech Solutions Inc.',
      taskTitle: 'Build a React E-commerce Website',
      amount: 500,
      status: 'completed',
      date: '2024-03-15',
      paymentMethod: 'Credit Card',
      invoiceUrl: '/invoices/invoice-1.pdf',
    },
    {
      id: '2',
      employerName: 'Design Studio',
      taskTitle: 'Create a Mobile App UI Design',
      amount: 300,
      status: 'pending',
      date: '2024-03-14',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: '3',
      employerName: 'Software Corp',
      taskTitle: 'Develop a REST API',
      amount: 400,
      status: 'failed',
      date: '2024-03-13',
      paymentMethod: 'PayPal',
    },
  ]);

  const handleConfirmPayment = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: 'completed' as const } : payment
    ));
    toast({
      title: 'Payment confirmed',
      description: 'You have confirmed receiving the payment.',
    });
  };

  const handleReportIssue = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: 'failed' as const } : payment
    ));
    toast({
      title: 'Issue reported',
      description: 'We have been notified of the payment issue.',
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
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
  };

  return (
    <DashboardLayout role="student" user={user}>
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
                        <h3 className="font-semibold">{payment.employerName}</h3>
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
                      <div className="flex space-x-2">
                        {payment.status === 'completed' && payment.invoiceUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Invoice
                          </Button>
                        )}
                        {payment.status === 'pending' && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleConfirmPayment(payment.id)}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleReportIssue(payment.id)}
                            >
                              Report Issue
                            </Button>
                          </>
                        )}
                        {payment.status === 'failed' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleReportIssue(payment.id)}
                          >
                            Report Issue
                          </Button>
                        )}
                      </div>
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
                          <h3 className="font-semibold">{payment.employerName}</h3>
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
                        <div className="flex space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleConfirmPayment(payment.id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReportIssue(payment.id)}
                          >
                            Report Issue
                          </Button>
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
                          <h3 className="font-semibold">{payment.employerName}</h3>
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
                        {payment.invoiceUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Invoice
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 