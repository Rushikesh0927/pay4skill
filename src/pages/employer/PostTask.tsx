import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

interface TaskForm {
  title: string;
  description: string;
  budget: string;
  deadline: string;
  category: string;
  skills: string[];
  experience: string;
}

export default function PostTask() {
  const { toast } = useToast();
  const [form, setForm] = useState<TaskForm>({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: '',
    skills: [],
    experience: '',
  });
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the task data to your backend
    toast({
      title: 'Task posted successfully',
      description: 'Your task has been posted and is now visible to students.',
    });
    // Reset form
    setForm({
      title: '',
      description: '',
      budget: '',
      deadline: '',
      category: '',
      skills: [],
      experience: '',
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm({
        ...form,
        skills: [...form.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setForm({
      ...form,
      skills: form.skills.filter(skill => skill !== skillToRemove),
    });
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
          <h1 className="text-2xl font-bold">Post a New Task</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter a clear and descriptive title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Provide detailed information about the task"
                  rows={6}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="Enter your budget"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="ui-design">UI Design</SelectItem>
                    <SelectItem value="content-writing">Content Writing</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Required Experience</Label>
                <Select
                  value={form.experience}
                  onValueChange={(value) => setForm({ ...form, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select required experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Post Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
