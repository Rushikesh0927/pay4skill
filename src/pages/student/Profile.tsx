import { useState, useEffect } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';

// Mock data for badges
const badges = [
  { id: 1, name: 'Fast Learner', icon: '🚀', description: 'Completed 5 tasks in a week' },
  { id: 2, name: 'Top Rated', icon: '⭐', description: 'Maintained 5-star rating for 3 months' },
  { id: 3, name: 'Team Player', icon: '🤝', description: 'Collaborated on 10+ tasks' },
  { id: 4, name: 'Problem Solver', icon: '🧩', description: 'Solved 5 complex tasks' },
];

interface ProfileData {
  fullName: string;
  email: string;
  bio: string;
  skills: string[];
  location: string;
  education: string;
  experience: string;
  resumeUrl?: string;
  avatar?: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser, isLoading } = useAuth();
  const [newSkill, setNewSkill] = useState('');
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    email: '',
    bio: '',
    skills: [],
    location: '',
    education: '',
    experience: '',
    resumeUrl: '',
  });

  // Initialize profile with user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || '',
        skills: user.skills || [],
        location: user.location || '',
        education: user.education || '',
        experience: user.experience || '',
        resumeUrl: '',
        avatar: user.avatar
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateUser({
        fullName: profile.fullName,
        bio: profile.bio,
        skills: profile.skills,
        location: profile.location,
        education: profile.education,
        experience: profile.experience,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    }
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

  // If user data is not available yet
  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <DashboardLayout role="student" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button 
            variant={isEditing ? "default" : "outline"} 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isLoading}
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
                    <AvatarImage src={profile.avatar} alt={profile.fullName} />
                    <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
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
                    <Label htmlFor="fullName">Full Name</Label>
                    {isEditing ? (
                      <Input 
                        id="fullName" 
                        value={profile.fullName} 
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})} 
                      />
                    ) : (
                      <p className="text-sm">{profile.fullName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <p className="text-sm">{profile.email}</p>
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
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
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
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      />
                      <Button onClick={handleAddSkill} type="button">Add</Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Resume</Label>
                  {isEditing ? (
                    <div className="flex flex-col gap-2">
                      <Input 
                        id="resume"
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileUpload}
                      />
                      <p className="text-xs text-neutral-500">
                        Upload your resume (PDF, DOC, or DOCX format)
                      </p>
                    </div>
                  ) : profile.resumeUrl ? (
                    <div className="flex items-center gap-2">
                      <a 
                        href={profile.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-mint-600 hover:underline"
                      >
                        View Resume
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-500">No resume uploaded</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>Badges & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {badges.map((badge) => (
                    <Card key={badge.id}>
                      <CardContent className="p-4 text-center">
                        <div className="mb-2 text-3xl">{badge.icon}</div>
                        <h3 className="font-semibold">{badge.name}</h3>
                        <p className="text-xs text-neutral-500">{badge.description}</p>
                      </CardContent>
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
