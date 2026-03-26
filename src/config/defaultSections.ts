import { CreateSectionDto } from "../types/section.types";

export const sectionTemplates: CreateSectionDto[] = [
  {
    type: "hero",
    name: "Hero Section",
    order: 1,
    isActive: true,
    content: {
      badge: "Malta's #1 Seller Platform",
      title: "Sell online in Malta,\nwithout the hassle",
      subtitle: "Join hundreds of local businesses already growing on Surf. Set up in minutes, reach thousands of customers, pay nothing upfront.",
      primaryCta: "Start Selling Free",
      secondaryCta: "How it works",
      features: ["Free to start", "No setup fees", "Go live in minutes"],
      mainCard: {
        title: "Manage & Ship",
        subtitle: "Handle orders with integrated logistics",
        imageUrl: "https://images.unsplash.com/photo-1687422808248-f807f4ea2a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBtYW4lMjBwYWNraW5nJTIwb3JkZXJzJTIwc21pbGV8ZW58MXx8fHwxNzcyNzE2NTUwfDA"
      },
      revenueCard: {
        title: "Monthly Revenue",
        value: "€12,450",
        change: "+32%",
        orders: "148",
        customers: "89"
      },
      maltaCard: {
        title: "Built for Malta",
        subtitle: "Local commerce, local solutions",
        imageUrl: "https://images.unsplash.com/photo-1675773680276-7e544248a111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWx0YSUyMFZhbGxldHRhJTIwY29sb3JmdWwlMjBidWlsZGluZ3MlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3MjcxNjU0Nnww"
      },
      notifications: [
        {
          type: "join",
          title: "New seller joined!",
          subtitle: "Valletta Crafts · just now",
          imageUrl: "https://images.unsplash.com/photo-1573495628363-7114730a4a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
        },
        {
          type: "order",
          title: "New order received",
          subtitle: "€47.50 · Sliema delivery"
        }
      ]
    }
  },
  {
    type: "stats",
    name: "Stats Strip",
    order: 2,
    isActive: true,
    content: {
      stats: [
        { label: "Active Sellers", value: "500+", iconName: "Users" },
        { label: "Products Listed", value: "50K+", iconName: "Package" },
        { label: "Satisfaction", value: "98%", iconName: "Star" },
        { label: "Support", value: "24/7", iconName: "Shield" }
      ]
    }
  },
  {
    type: "how-it-works",
    name: "How It Works",
    order: 3,
    isActive: true,
    content: {
      badge: "Process",
      title: "How it works",
      subtitle: "Four simple steps to start your online business in Malta.",
      steps: [
        { num: "01", title: "Register & Set Up", desc: "Create your account with valid business info and get approved instantly." },
        { num: "02", title: "Add Your Products", desc: "Upload manually, bulk CSV, or connect Shopify / WooCommerce." },
        { num: "03", title: "Choose Logistics", desc: "Pick from trusted local delivery partners like MaltaPost or DHL." },
        { num: "04", title: "Start Earning", desc: "Go live and start receiving orders from customers across Malta." }
      ]
    }
  },
  {
    type: "features",
    name: "Features Section",
    order: 4,
    isActive: true,
    content: {
      badge: "Features",
      title: "Everything you need to sell in Malta",
      subtitle: "Professional e-commerce tools designed specifically for Maltese businesses.",
      features: [
        {
          id: "1",
          title: "Easy Seller Onboarding",
          content: "Start selling with simple tools built for local businesses.",
          list: [
            "Quick registration & verification",
            "Dedicated seller dashboard",
            "Bulk CSV upload or integrations",
            "Shopify, WooCommerce & PrestaShop sync"
          ]
        },
        {
          id: "2",
          title: "Secure Payments",
          content: "Accept payments smoothly with trusted gateways.",
          list: [
            "PayPal & local payment options",
            "PCI-compliant checkout",
            "Built-in fraud protection",
            "Easy payout setup"
          ]
        },
        {
          id: "3",
          title: "Mobile Excellence",
          content: "Deliver a smooth shopping experience on every device.",
          list: [
            "Fully responsive storefront",
            "Intuitive product navigation",
            "Fast mobile checkout",
            "Speed-optimized pages"
          ]
        },
        {
          id: "4",
          title: "Smart Shipping",
          content: "Flexible delivery tools for local & international customers.",
          list: [
            "Real-time shipping rates",
            "Live order tracking",
            "MaltaPost & DHL integration",
            "Custom shipping methods"
          ]
        },
        {
          id: "5",
          title: "Reports & Insights",
          content: "Make data-driven decisions with built-in analytics.",
          list: [
            "Order & inventory stats",
            "Per-seller sales reports",
            "Customer insights",
            "Performance optimization"
          ]
        },
        {
          id: "6",
          title: "Dedicated Support",
          content: "Get help when you need it — always.",
          list: [
            "Personal onboarding assistance",
            "Knowledge base & tutorials",
            "Priority email & chat support",
            "Seller community group"
          ]
        }
      ]
    }
  },
  {
    type: "mobile-app",
    name: "Mobile App Banner",
    order: 5,
    isActive: true,
    content: {
      badge: "MOBILE APP",
      title: "Your store in\nyour pocket",
      subtitle: "Manage orders, track sales, and respond to customers on the go. The Surf Seller app puts your entire business at your fingertips.",
      features: [
        { iconName: "Bell", text: "Instant order notifications" },
        { iconName: "BarChart3", text: "Real-time sales dashboard" },
        { iconName: "Zap", text: "Quick product management" }
      ],
      mockup: {
        greeting: "Good morning",
        title: "Seller Dashboard",
        revenueTitle: "Today's Revenue",
        revenueValue: "€247.50",
        revenueChange: "+18% vs yesterday",
        notificationTitle: "New order #1084",
        notificationSubtitle: "€47.50 - 2 items",
        appBgImage: "https://images.unsplash.com/photo-1609162554108-6490759499ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
      },
      floatingNotification: {
        title: "Order shipped!",
        subtitle: "#1083 - Sliema"
      }
    }
  },
  {
    type: "testimonials",
    name: "Testimonials",
    order: 6,
    isActive: true,
    content: {
      badge: "Testimonials",
      title: "What our sellers say",
      subtitle: "Join thousands of satisfied sellers growing their businesses on Surf.",
      testimonials: [
        {
          name: "Maria Garcia",
          title: "Owner, Valletta Crafts",
          quote: "Surf has been a game-changer for our small business. The platform is user-friendly, and the support is exceptional.",
          avatar: "https://images.unsplash.com/photo-1769636930016-5d9f0ca653aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGVudHJlcHJlbmV1ciUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyNzE1OTI5fDA",
          stars: 5
        },
        {
          name: "David Borg",
          title: "CEO, Malta Tech Solutions",
          quote: "We were hesitant at first, but Surf's robust features and seamless integration made the transition smooth.",
          avatar: "https://images.unsplash.com/photo-1768467485681-d4f93929fd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwaGVhZHNob3QlMjBtZWRpdGVycmFuZWFufGVufDF8fHx8MTc3MjcyMTkyMnww",
          stars: 5
        },
        {
          name: "Sophia Camilleri",
          title: "Founder, Green Living Malta",
          quote: "The platform's sustainability initiatives have helped us attract a more conscious customer base.",
          avatar: "https://images.unsplash.com/photo-1568337339905-7165c43848b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZm91bmRlciUyMHN0YXJ0dXAlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc3MjcyMTkyM3ww",
          stars: 5
        }
      ]
    }
  },
  {
    type: "faq",
    name: "FAQ Section",
    order: 7,
    isActive: true,
    content: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about selling on Surf.",
      questions: [
        {
          id: 1,
          question: "How much does it cost to start selling on Surf?",
          answer: "It's completely free to start! There are no setup fees, monthly subscriptions, or hidden costs. You only pay a small commission when you make a sale.",
          category: "general"
        },
        {
          id: 2,
          question: "Do I need a Malta VAT number to sell?",
          answer: "Yes, you need a valid Malta VAT number to sell on Surf. We accept both individual and business VAT numbers.",
          category: "general"
        },
        {
          id: 3,
          question: "How quickly can I start selling?",
          answer: "Most sellers are approved and can start listing products within 24-48 hours of registration.",
          category: "selling"
        },
        {
          id: 4,
          question: "What commission do I pay on sales?",
          answer: "We currently offer a 0% commission rate to support new sellers and help them grow their business.",
          category: "payment"
        },
        {
          id: 5,
          question: "Can I use my own shipping methods?",
          answer: "Yes! You can choose to handle shipping yourself or use our integrated shipping partners like MaltaPost and DHL.",
          category: "shipping"
        },
        {
          id: 6,
          question: "What types of products can I sell on Surf?",
          answer: "You can sell a wide range of products including crafts, electronics, fashion, home goods, food items, and more.",
          category: "selling"
        }
      ]
    }
  },
  {
    type: "get-started",
    name: "Get Started Section",
    order: 8,
    isActive: true,
    content: {
      title: "Start your e-commerce journey",
      subtitle: "Sellers across Malta are embracing the future of commerce with Surf — where going online is simple and rewarding.",
      primaryCta: "Start Selling Free",
      footerNote: "No credit card required · Set up in under 5 minutes"
    }
  },
  {
    type: "footer",
    name: "Footer Section",
    order: 9,
    isActive: true,
    content: {
      columns: [
        {
          title: "Get Started",
          links: [
            { label: "Register now", href: "/register" },
            { label: "Seller Login", href: "/login", external: true }
          ]
        },
        {
          title: "Platform",
          links: [
            { label: "Seller Guide", href: "https://www.youtube.com/@SurfSellerHub", external: true },
            { label: "Integrations", href: "/pricing" }
          ]
        },
        {
          title: "Legal",
          links: [
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Acceptable Use Policy", href: "/acceptable-use" }
          ]
        },
        {
          title: "Company",
          links: [
            { label: "About Surf", href: "/about" },
            { label: "Blog", href: "https://surf.mt/blogs/", external: true },
            { label: "Contact Us", href: "/contact" }
          ]
        }
      ],
      socialLinks: [
        { platform: "Facebook", href: "https://www.facebook.com/surfmt.malta" },
        { platform: "Instagram", href: "https://www.instagram.com/surf.mt" },
        { platform: "Linkedin", href: "https://www.linkedin.com/company/surfmt" },
        { platform: "Youtube", href: "https://www.youtube.com/@SurfSellerHub" }
      ],
      contact: {
        email: "sell@surf.mt",
        phone: "+356 7741 3456"
      },
      copyright: "© 2026 Surf. All rights reserved."
    }
  },
  {
    type: "custom-layout",
    name: "Custom Layout",
    order: 10,
    isActive: true,
    content: {
      blocks: [
        {
          type: "heading",
          text: "Design Your Own Section",
          style: "text-4xl md:text-5xl font-extrabold text-center",
          color: "text-gray-900"
        },
        {
          type: "text",
          text: "This is a custom layout where you can add, remove, and arrange blocks of content to create a completely unique UI.",
          style: "text-lg text-center max-w-2xl mx-auto",
          color: "text-gray-600"
        },
        {
          type: "button",
          text: "Get Started Now",
          url: "/register",
          style: "bg-blue-600 text-white font-bold rounded-xl px-8 py-4 mx-auto block w-fit"
        }
      ]
    }
  }
];

// Seed data should only be the core site structure
export const initialSections = sectionTemplates.filter(s => s.type !== 'custom-layout');
