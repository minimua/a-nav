'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Search, Github } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { NavigationData } from '@/types/navigation';

interface NavSiteProps {
  initialData: NavigationData;
}

const getFaviconUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
  } catch {
    return '';
  }
};

const NavSite = ({ initialData }: NavSiteProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialData.categories[0].name);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode, mounted]);

  if (!mounted) {
    return null;
  }

  const renderIcon = (icon: string, url?: string) => {
    const iconUrl = icon || (url ? getFaviconUrl(url) : '');
    
    if (!iconUrl) return null;
    
    return (
      <img 
        src={iconUrl}
        alt=""
        className="w-5 h-5 rounded-sm object-contain flex-shrink-0"
        onError={(e) => {
          console.error('Image loading error:', e);
          const imgElement = e.target as HTMLImageElement;
          imgElement.style.display = 'none';
        }}
      />
    );
  };

  const filteredLinks = initialData.categories.flatMap(category => 
    category.links.filter(link => 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentLinks = searchTerm
    ? filteredLinks
    : initialData.categories.find(c => c.name === selectedCategory)?.links || [];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white'}`}>
      {/* Header */}
      <header className="border-b p-4 sticky top-0 bg-inherit z-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold">一个导航</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="搜索..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto flex flex-col md:flex-row gap-6 p-4">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <nav className="sticky top-24">
            <ul className="space-y-2">
              {initialData.categories.map((category) => (
                <li key={category.name}>
                  <Button
                    variant={selectedCategory === category.name ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon && renderIcon(category.icon)}
                    <span>{category.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {renderIcon(link.icon || '', link.url)}
                    <span className="flex-1">{link.title}</span>
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                  {link.tags && link.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {link.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    访问
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t p-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">© 2024 一个导航. All rights reserved.</p>
          <a 
            href="https://github.com/minimua/a-nav" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NavSite;