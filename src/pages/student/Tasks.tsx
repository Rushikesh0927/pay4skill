import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const mockTasks = [
  {
    id: 1,
    title: 'Build a React E-commerce Website',
    description: 'Create a modern e-commerce website using React, TypeScript, and Tailwind CSS.',
    budget: 500,
    deadline: '2024-05-15',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    employer: 'Tech Corp',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Develop a cross-platform mobile app using React Native.',
    budget: 800,
    deadline: '2024-05-20',
    skills: ['React Native', 'JavaScript', 'Firebase'],
    employer: 'Mobile Solutions',
  },
  {
    id: 3,
    title: 'Data Analysis Project',
    description: 'Analyze sales data and create visualizations using Python.',
    budget: 300,
    deadline: '2024-05-10',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    employer: 'Data Insights',
  },
];

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<string>('all');

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
  };

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.every((skill) => task.skills.includes(skill));
    
    const matchesBudget = budgetRange === 'all' ||
      (budgetRange === 'low' && task.budget <= 300) ||
      (budgetRange === 'medium' && task.budget > 300 && task.budget <= 600) ||
      (budgetRange === 'high' && task.budget > 600);
    
    return matchesSearch && matchesSkills && matchesBudget;
  });

  return (
    <DashboardLayout role="student" user={user}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Browse Tasks</h1>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select value={budgetRange} onValueChange={setBudgetRange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="low">$0 - $300</SelectItem>
                <SelectItem value="medium">$301 - $600</SelectItem>
                <SelectItem value="high">$601+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle className="text-lg">{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-500">{task.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {task.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Budget: ${task.budget}</p>
                    <p className="text-xs text-gray-500">Due: {task.deadline}</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
