import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Upload, Award, Edit, Save, X } from 'lucide-react';

// Mock data for badges
const badges = [
  { id: 1, name: 'Fast Learner', icon: '🚀', description: 'Completed 5 tasks in a week' },
  { id: 2, name: 'Top Rated', icon: '⭐', description: 'Maintained 5-star rating for 3 months' },
  { id: 3, name: 'Team Player', icon: '🤝', description: 'Collaborated on 10+ tasks' },
  { id: 4, name: 'Problem Solver', icon: '🧩', description: 'Solved 5 complex tasks' },
];

interface Profile {
  name: string;
  email: string;
  bio: string;
  skills: string[];
  location: string;
  education: string;
  experience: string;
  resumeUrl: string;
  avatar?: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Passionate web developer with 3 years of experience in React and Node.js. Looking for challenging projects to enhance my skills.',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express'],
    location: 'New York, USA',
    education: 'Bachelor of Science in Computer Science',
    experience: '3 years of web development',
    resumeUrl: '/resumes/john-doe-resume.pdf',
    avatar: undefined
  });
  const [newSkill, setNewSkill] = useState('');

  const user = {
    name: profile.name,
    email: profile.email,
    avatar: undefined,
  };

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      toast({
        title: "Resume uploaded",
        description: "Your resume has been successfully uploaded.",
      });
    }
  };

  return (
    <DashboardLayout role="student" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button 
            variant={isEditing ? "default" : "outline"} 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills & Resume</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input 
                        id="name" 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})} 
                      />
                    ) : (
                      <p className="text-sm">{profile.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email} 
                        onChange={(e) => setProfile({...profile, email: e.target.value})} 
                      />
                    ) : (
                      <p className="text-sm">{profile.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input 
                        id="location" 
                        value={profile.location} 
                        onChange={(e) => setProfile({...profile, location: e.target.value})} 
                      />
                    ) : (
                      <p className="text-sm">{profile.location}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    {isEditing ? (
                      <Input 
                        id="education" 
                        value={profile.education} 
                        onChange={(e) => setProfile({...profile, education: e.target.value})} 
                      />
                    ) : (
                      <p className="text-sm">{profile.education}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    {isEditing ? (
                      <Input 
                        id="experience" 
                        value={profile.experience} 
                        onChange={(e) => setProfile({...profile, experience: e.target.value})} 
                      />
                    ) : (
                      <p className="text-sm">{profile.experience}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea 
                      id="bio" 
                      value={profile.bio} 
                      onChange={(e) => setProfile({...profile, bio: e.target.value})} 
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-line">{profile.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                        {isEditing && (
                          <X 
                            className="ml-1 h-3 w-3 cursor-pointer" 
                            onClick={() => handleRemoveSkill(skill)}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a skill" 
                        value={newSkill} 
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                      />
                      <Button onClick={handleAddSkill}>Add</Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <Label>Resume</Label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Upload className="mr-2 h-4 w-4" />
                      {profile.resumeUrl ? 'Update Resume' : 'Upload Resume'}
                    </Button>
                    {profile.resumeUrl && (
                      <a 
                        href={profile.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Current Resume
                      </a>
                    )}
                  </div>
                  {isEditing && (
                    <div className="mt-2">
                      <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileUpload}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>My Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {badges.map((badge) => (
                    <Card key={badge.id} className="flex flex-col items-center p-4 text-center">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                        {badge.icon}
                      </div>
                      <h3 className="mb-1 font-medium">{badge.name}</h3>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
