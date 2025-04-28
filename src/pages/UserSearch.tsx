import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Star, Briefcase, GraduationCap, Filter } from 'lucide-react';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userType, setUserType] = useState('students');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Sample data - would be fetched from API in production
  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: undefined,
      bio: 'Full-stack developer with 3 years of experience. Passionate about creating efficient and scalable web applications.',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      location: 'San Francisco, USA',
      education: 'BS Computer Science, Stanford University',
      rating: 4.8,
      completedTasks: 15,
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: undefined,
      bio: 'UI/UX designer with a focus on creating intuitive and beautiful user experiences. Specialized in mobile app design.',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'Mobile Design'],
      location: 'Madrid, Spain',
      education: 'MS Design, Barcelona Design School',
      rating: 4.9,
      completedTasks: 12,
    },
    {
      id: 3,
      name: 'David Chen',
      avatar: undefined,
      bio: 'Data scientist with expertise in machine learning and data visualization. Experienced in Python, R, and SQL.',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization'],
      location: 'Toronto, Canada',
      education: 'MS Data Science, University of Toronto',
      rating: 4.7,
      completedTasks: 8,
    },
  ];

  const employers = [
    {
      id: 1,
      name: 'Tech Solutions Inc',
      avatar: undefined,
      bio: 'Software company specializing in enterprise solutions. Looking for talented developers to join our team.',
      industry: 'Technology',
      location: 'New York, USA',
      postedTasks: 25,
      rating: 4.6,
    },
    {
      id: 2,
      name: 'Creative Design Studio',
      avatar: undefined,
      bio: 'Boutique design agency focused on branding and web design. We work with startups and established businesses.',
      industry: 'Design',
      location: 'London, UK',
      postedTasks: 18,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'John Smith',
      avatar: undefined,
      bio: 'Entrepreneur with multiple successful startups. Currently looking for developers for a new project.',
      industry: 'Entrepreneurship',
      location: 'Austin, USA',
      postedTasks: 5,
      rating: 4.5,
    },
  ];

  const allSkills = [
    'React', 'Node.js', 'TypeScript', 'MongoDB', 'Python', 'Java', 
    'UI/UX', 'Figma', 'Adobe XD', 'Mobile Design', 'Data Analysis',
    'Machine Learning', 'Content Writing', 'SEO', 'Marketing'
  ];

  const locations = [
    'All Locations',
    'North America',
    'Europe',
    'Asia',
    'Remote',
    'Other',
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rating' },
    { value: 'tasks', label: 'Most Tasks' },
    { value: 'name', label: 'Name (A-Z)' },
  ];

  const handleSearch = () => {
    // In a real app, this would call an API with the search parameters
    console.log('Searching with:', {
      query: searchQuery,
      userType,
      skills: selectedSkills,
      location: selectedLocation,
      sortBy,
    });
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Find Users</h1>
      
      <Tabs value={userType} onValueChange={setUserType} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="employers">Employers</TabsTrigger>
        </TabsList>
      </Tabs>
      
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
                <label className="text-sm font-medium">Skills</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                  {allSkills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
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
        
        {/* User List */}
        <div className="lg:col-span-3">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search ${userType}...`}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          
          <div className="space-y-4">
            {userType === 'students' ? (
              students.map((student) => (
                <Card key={student.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{student.name}</CardTitle>
                        <CardDescription className="mt-1">{student.bio}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {student.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {student.location}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {student.education}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {student.completedTasks} completed tasks
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{student.rating}</span>
                    </div>
                    <Button variant="outline">View Profile</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              employers.map((employer) => (
                <Card key={employer.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employer.avatar} />
                        <AvatarFallback>{getInitials(employer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{employer.name}</CardTitle>
                        <CardDescription className="mt-1">{employer.bio}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {employer.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {employer.industry}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {employer.postedTasks} posted tasks
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{employer.rating}</span>
                    </div>
                    <Button variant="outline">View Profile</Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch; 