import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ViewTransitionName =
  | 'hero'
  | 'hero-image'
  | 'hero-title'
  | 'hero-description'
  | 'services'
  | 'services-title'
  | 'projects'
  | 'projects-title'
  | 'blog'
  | 'blog-title'
  | 'about'
  | 'about-title'
  | 'contact'
  | 'contact-title'
  | 'footer'
  | 'header'
  | 'logo'
  | 'nav'
  | 'page-title'
  | 'content'
  | string

interface ViewTransitionProps {
  children: React.ReactNode
  name: ViewTransition
  className?: string
}

export function viewTransition(name: ViewTransition): string {
  return `vt-${name}`
}

export const vt = (name: ViewTransition) => viewTransition(name)

export function ViewTransition({ children, name, className }: ViewTransitionProps) {
  return (
    <div
      className={twMerge('view-transition-group', className)}
      style={{ viewTransitionName: name }}
    >
      {children}
    </div>
  )
}

// CSS for view transitions
export const viewTransitionCSS = `
/* Base view transition styles */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Named element transitions */
.view-transition-group {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hero section transitions */
::view-transition-old(hero),
::view-transition-new(hero) {
  animation-duration: 0.5s;
}

::view-transition-old(hero-image),
::view-transition-new(hero-image) {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

/* Services section */
::view-transition-old(services),
::view-transition-new(services) {
  animation-duration: 0.4s;
  animation-delay: 0.1s;
}

/* Projects section */
::view-transition-old(projects),
::view-transition-new(projects) {
  animation-duration: 0.4s;
  animation-delay: 0.2s;
}

/* Header/Navigation */
::view-transition-old(header),
::view-transition-new(header) {
  animation-duration: 0.25s;
}

/* Logo transition */
::view-transition-old(logo),
::view-transition-new(logo) {
  animation-duration: 0.3s;
}

/* Footer transition */
::view-transition-old(footer),
::view-transition-new(footer) {
  animation-duration: 0.3s;
}

/* Page content */
::view-transition-old(content),
::view-transition-new(content) {
  animation-duration: 0.35s;
}

/* Slide animations for page content */
@keyframes slide-up-fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes slide-up-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-left-fade-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

@keyframes slide-left-fade-in {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Apply slide animations to named elements */
::view-transition-old(content) {
  animation: slide-up-fade-out 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

::view-transition-new(content) {
  animation: slide-up-fade-in 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Hero image crossfade */
::view-transition-old(hero-image) {
  animation: fade-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

::view-transition-new(hero-image) {
  animation: fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
  
  .view-transition-group {
    animation: none !important;
  }
}
`

export type ViewTransition =
  | 'hero'
  | 'hero-image'
  | 'hero-title'
  | 'hero-description'
  | 'services'
  | 'services-title'
  | 'projects'
  | 'projects-title'
  | 'blog'
  | 'blog-title'
  | 'about'
  | 'about-title'
  | 'contact'
  | 'contact-title'
  | 'footer'
  | 'header'
  | 'logo'
  | 'nav'
  | 'page-title'
  | 'content'
