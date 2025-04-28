import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Calendar, DollarSign, Clock, Filter } from 'lucide-react';

const TaskSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Sample data - would be fetched from API in production
  const tasks = [
    {
      id: 1,
      title: 'Website Development for Small Business',
      description: 'Need a responsive website for my small business. Looking for a developer with experience in React and Node.js.',
      budget: 1200,
      deadline: '2023-12-15',
      category: 'Web Development',
      location: 'Remote',
      skills: ['React', 'Node.js', 'MongoDB'],
      employer: {
        name: 'John Smith',
        rating: 4.8,
      },
      postedAt: '2023-11-01',
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Looking for a UI/UX designer to create wireframes and mockups for a fitness tracking app.',
      budget: 800,
      deadline: '2023-12-10',
      category: 'Design',
      location: 'New York, USA',
      skills: ['UI/UX', 'Figma', 'Mobile Design'],
      employer: {
        name: 'Sarah Johnson',
        rating: 4.5,
      },
      postedAt: '2023-11-05',
    },
    {
      id: 3,
      title: 'Content Writing for Tech Blog',
      description: 'Need a content writer to create 5 articles about emerging tech trends for our blog.',
      budget: 500,
      deadline: '2023-12-20',
      category: 'Writing',
      location: 'Remote',
      skills: ['Content Writing', 'SEO', 'Tech Knowledge'],
      employer: {
        name: 'Tech Blog Inc',
        rating: 4.2,
      },
      postedAt: '2023-11-08',
    },
    {
      id: 4,
      title: 'Data Analysis for Market Research',
      description: 'Looking for a data analyst to analyze market research data and create visualizations.',
      budget: 1500,
      deadline: '2023-12-25',
      category: 'Data Analysis',
      location: 'London, UK',
      skills: ['Data Analysis', 'Python', 'Tableau'],
      employer: {
        name: 'Market Research Co',
        rating: 4.7,
      },
      postedAt: '2023-11-10',
    },
  ];

  const categories = [
    'All Categories',
    'Web Development',
    'Mobile Development',
    'Design',
    'Writing',
    'Data Analysis',
    'Marketing',
    'Other',
  ];

  const locations = [
    'All Locations',
    'Remote',
    'North America',
    'Europe',
    'Asia',
    'Other',
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget-high', label: 'Highest Budget' },
    { value: 'budget-low', label: 'Lowest Budget' },
    { value: 'deadline-soon', label: 'Deadline Soon' },
  ];

  const handleSearch = () => {
    // In a real app, this would call an API with the search parameters
    console.log('Searching with:', {
      query: searchQuery,
      category: selectedCategory,
      location: selectedLocation,
      isRemoteOnly,
      sortBy,
    });
  };

  const handleApply = (taskId: number) => {
    // In a real app, this would navigate to the application page or open a modal
    console.log('Applying for task:', taskId);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Find Tasks</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase().replace(' ', '-')}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remote-only" 
                  checked={isRemoteOnly} 
                  onCheckedChange={(checked) => setIsRemoteOnly(checked as boolean)} 
                />
                <label htmlFor="remote-only" className="text-sm font-medium">
                  Remote Only
                </label>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full" onClick={handleSearch}>
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Task List */}
        <div className="lg:col-span-3">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription className="mt-1">{task.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      ${task.budget}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {task.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Posted: {new Date(task.postedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm">
                    <span className="mr-1">Posted by:</span>
                    <span className="font-medium">{task.employer.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {task.employer.rating} ★
                    </Badge>
                  </div>
                  <Button onClick={() => handleApply(task.id)}>Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSearch; 