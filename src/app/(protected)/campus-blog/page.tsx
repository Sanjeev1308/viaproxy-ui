'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags?: string[];
  coverImage?: string;
}

interface CreatePostFormData {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage?: string;
}

interface BlogPostProps {
  selectedPost: Post | null;
}

interface BlogListProps {
  selectedPost: Post | null;
  onSelectPost: (post: Post) => void;
  searchQuery: string;
}

interface CreatePostDialogProps {
  onCreatePost: (post: CreatePostFormData) => void;
}

const DEMO_POSTS: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Web Development',
    excerpt:
      'Learn the fundamentals of web development and start building your first website.',
    author: 'John Doe',
    date: '2024-03-20T10:00:00Z',
    content: `Web development is an exciting journey that combines creativity with technical skills.
        In this guide, we'll explore the basic building blocks of the web: HTML, CSS, and JavaScript.
        
        ## HTML: The Foundation
        HTML (HyperText Markup Language) provides the structure for web content...
        
        ## CSS: Adding Style
        CSS (Cascading Style Sheets) brings your HTML to life with colors, layouts, and animations...
        
        ## JavaScript: Adding Interactivity
        JavaScript makes your websites dynamic and interactive...`,
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  },
  {
    id: '2',
    title: 'Modern Frontend Frameworks',
    excerpt:
      'Explore popular frontend frameworks like React, Vue, and Angular.',
    author: 'Jane Smith',
    date: '2024-03-19T15:30:00Z',
    content: `Frontend frameworks have revolutionized how we build web applications.
        Let's explore some of the most popular options available today.
        
        ## React
        React is a JavaScript library for building user interfaces...
        
        ## Vue.js
        Vue.js is a progressive framework for building user interfaces...
        
        ## Angular
        Angular is a platform for building web applications...`,
    tags: ['React', 'Vue', 'Angular', 'Frontend'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  },
];

interface BlogHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function BlogHeader({ searchQuery, onSearchChange }: BlogHeaderProps) {
  const handleCreatePost = (formData: CreatePostFormData) => {
    // In a real app, this would make an API call
    console.log('Creating post:', formData);
  };
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-[50%]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <CreatePostDialog onCreatePost={handleCreatePost} />
      </div>
    </>
  );
}

function BlogPost({ selectedPost }: BlogPostProps) {
  if (!selectedPost) {
    return (
      <div className="flex h-[calc(100vh-5rem)] items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">Select a post to start reading</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <article className="flex flex-col prose prose-neutral dark:prose-invert max-w-none space-y-6 rounded-lg border p-6">
        {selectedPost.coverImage && (
          <img
            src={selectedPost.coverImage}
            alt={selectedPost.title}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}
        <header>
          <h1 className="mb-2 text-3xl font-bold">{selectedPost.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{selectedPost.author}</span>
              <span>•</span>
              <span>
                {new Date(selectedPost.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            {selectedPost.tags && (
              <>
                <span className="text-muted-foreground">•</span>
                <div className="flex flex-wrap gap-1">
                  {selectedPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>
        <div className="prose prose-neutral dark:prose-invert">
          {selectedPost.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </ScrollArea>
  );
}

function CreatePostDialog({ onCreatePost }: CreatePostDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreatePostFormData>({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePost(formData);
    setFormData({ title: '', excerpt: '', content: '', tags: [] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <form onSubmit={handleSubmit} className="grid gap-4 p-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter post title..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Enter a brief description..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write your post content..."
                className="min-h-[200px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
              <Input
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                placeholder="Enter image URL..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(',').map((tag) => tag.trim()),
                  })
                }
                placeholder="Enter tags..."
              />
            </div>
            <Button type="submit">Publish Post</Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function BlogList({ selectedPost, onSelectPost, searchQuery }: BlogListProps) {
  const filteredPosts = DEMO_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  return (
    <div className="flex h-full flex-col gap-4">
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-4 pr-4">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => onSelectPost(post)}
              className={`flex flex-row gap-2 items-stretch w-full rounded-lg p-4 text-left transition-colors hover:bg-accent ${
                selectedPost?.id === post.id ? 'bg-accent' : ''
              }`}
            >
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                {/* {post.tags && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )} */}
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <div>
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-32 rounded-md object-cover"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
export default function CampusBlog() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <BlogHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="grid gap-6 lg:grid-cols-[1fr_50%]">
        <BlogList
          onSelectPost={setSelectedPost}
          selectedPost={selectedPost}
          searchQuery={searchQuery}
        />
        <BlogPost selectedPost={selectedPost} />
      </div>
    </div>
  );
}
