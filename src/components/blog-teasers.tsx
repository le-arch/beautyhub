import Image from 'next/image';
import { mockBlogPosts } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BlogTeasers = () => {
  return (
    <section id="blog" className="py-16 sm:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <h2 className="text-center font-headline text-4xl font-bold">
          From Our Beauty Experts
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Get the latest tips, trends, and inspiration from our blog.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {mockBlogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
                <CardHeader className="p-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={post.imageHint}
                    />
                </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                <p className="mt-2 text-muted-foreground flex-grow">{post.excerpt}</p>
                <Link href="#" className="mt-4 text-primary font-bold inline-flex items-center group/link">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">Visit Our Blog</Button>
        </div>
      </div>
    </section>
  );
};

export default BlogTeasers;
