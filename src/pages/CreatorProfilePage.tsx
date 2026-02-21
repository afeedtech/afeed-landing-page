import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Check, BadgeCheck, BookOpen, Video, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCreatorBySlug } from '@/data/mockCreators';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const productTypeIcons = {
  course: BookOpen,
  session: Video,
  membership: Users,
  program: Calendar,
};

const productTypeColors = {
  course: 'from-amber-400 to-orange-500',
  session: 'from-rose-400 to-pink-500',
  membership: 'from-emerald-400 to-teal-500',
  program: 'from-blue-400 to-indigo-500',
};

export default function CreatorProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { isRTL } = useLanguage();
  const creator = slug ? getCreatorBySlug(slug) : undefined;

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Creator not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className={cn("w-5 h-5", isRTL && "rotate-180")} />
            <span className="text-sm font-medium">Back to Afeed</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            afeed.co/{creator.handle}
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="pt-16">
        <div className="h-48 md:h-64 relative">
          <img 
            src={creator.coverImage} 
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-10">
        {/* Profile Header */}
        <div className={cn(
          "flex flex-col md:flex-row gap-6 items-start",
          isRTL && "md:flex-row-reverse"
        )}>
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img 
              src={creator.image} 
              alt={creator.name}
              className="w-32 h-32 rounded-2xl border-4 border-background object-cover shadow-xl"
            />
            {creator.verified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className={cn("flex-1", isRTL && "text-end")}>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-foreground">{creator.name}</h1>
              {creator.verified && (
                <BadgeCheck className="w-6 h-6 text-primary" />
              )}
            </div>
            <p className="text-lg text-muted-foreground mt-1">{creator.headline}</p>
            
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(creator.rating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-muted"
                    )} 
                  />
                ))}
                <span className="text-sm text-muted-foreground ms-1">
                  {creator.rating} ({creator.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mt-4">
              {creator.credentials.map((cred, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8 p-6 bg-card rounded-2xl border border-border">
          <h2 className="font-semibold text-foreground mb-2">About</h2>
          <p className="text-muted-foreground leading-relaxed">{creator.bio}</p>
        </div>

        {/* Products */}
        <div className="mt-8 mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">Products & Services</h2>
          <div className="grid gap-4">
            {creator.products.map((product) => {
              const Icon = productTypeIcons[product.type];
              const gradient = productTypeColors[product.type];
              
              return (
                <div 
                  key={product.id}
                  className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform",
                    gradient
                  )}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{product.title}</h3>
                      {product.featured && (
                        <span className="text-xs font-bold text-white bg-amber-500 px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <span className="font-bold text-lg text-foreground">
                      {product.price} {product.currency}
                    </span>
                    {product.billingCycle && (
                      <span className="text-sm text-muted-foreground">/{product.billingCycle === 'monthly' ? 'mo' : product.billingCycle}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
