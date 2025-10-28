# Dark Mode Implementation Guide

## 🌙 Overview

Dark mode support has been added to the GreenScout website, allowing users to toggle between light and dark themes. The implementation includes:

- ✅ Dark mode toggle button in the navbar
- ✅ Automatic system preference detection
- ✅ Persistent user preference (saved in localStorage)
- ✅ Smooth transitions between modes
- ✅ Tailwind CSS class-based dark mode

## 🎨 How It Works

### 1. **Context Provider** (`src/context/DarkModeContext.tsx`)

Manages global dark mode state across the application:
- Detects system preference on first load
- Saves user preference to localStorage
- Provides `isDarkMode` state and `toggleDarkMode` function

### 2. **Toggle Button** (`src/components/DarkModeToggle.tsx`)

A button component that:
- Shows sun icon (☀️) in dark mode
- Shows moon icon (🌙) in light mode
- Added to the navbar for easy access

### 3. **Tailwind Configuration** (`tailwind.config.js`)

Enabled class-based dark mode:
```javascript
darkMode: 'class'
```

This allows using `dark:` prefix for dark mode styles.

### 4. **Global Styles** (`src/index.css`)

Base dark mode styles for smooth transitions:
```css
body {
  @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200;
}
```

## 🎯 Adding Dark Mode to Components

### Basic Usage

Use Tailwind's `dark:` prefix to add dark mode styles:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

### Common Patterns

#### Background Colors
```tsx
// Light backgrounds
className="bg-white dark:bg-gray-900"
className="bg-gray-50 dark:bg-gray-800"
className="bg-green-50 dark:bg-green-900/20"

// Colored backgrounds
className="bg-green-100 dark:bg-green-900"
className="bg-purple-100 dark:bg-purple-900"
```

#### Text Colors
```tsx
// Primary text
className="text-gray-900 dark:text-gray-100"

// Secondary text
className="text-gray-600 dark:text-gray-400"

// Links
className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
```

#### Borders
```tsx
className="border border-gray-200 dark:border-gray-700"
className="border-t border-green-700 dark:border-green-600"
```

#### Shadows
```tsx
className="shadow-md dark:shadow-gray-800/50"
className="shadow-xl dark:shadow-2xl dark:shadow-gray-900"
```

## 📝 Example: Converting a Component to Dark Mode

### Before (Light Mode Only)
```tsx
<section className="py-20 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-green-800 mb-6">
      Title
    </h2>
    <p className="text-gray-700">
      Description text
    </p>
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Card Title
      </h3>
    </div>
  </div>
</section>
```

### After (With Dark Mode)
```tsx
<section className="py-20 px-4 bg-white dark:bg-gray-900">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-6">
      Title
    </h2>
    <p className="text-gray-700 dark:text-gray-300">
      Description text
    </p>
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Card Title
      </h3>
    </div>
  </div>
</section>
```

## 🎨 GreenScout Color Recommendations

For the GreenScout brand colors in dark mode:

### Green Palette
- `text-green-700` → `dark:text-green-400`
- `text-green-800` → `dark:text-green-300`
- `bg-green-100` → `dark:bg-green-900/20`
- `bg-green-200` → `dark:bg-green-900/30`

### Purple Palette
- `text-purple-700` → `dark:text-purple-400`
- `text-purple-800` → `dark:text-purple-300`
- `bg-purple-100` → `dark:bg-purple-900/20`
- `bg-purple-200` → `dark:bg-purple-900/30`

### Gradients
```tsx
// Light mode
className="bg-gradient-to-br from-green-50 to-purple-50"

// With dark mode
className="bg-gradient-to-br from-green-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
```

## 🛠️ Using the Dark Mode Hook

In your components, you can access dark mode state:

```tsx
import { useDarkMode } from '../context/DarkModeContext';

function MyComponent() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div>
      <p>Current mode: {isDarkMode ? 'Dark' : 'Light'}</p>
      <button onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
    </div>
  );
}
```

## 🎯 Best Practices

1. **Always add dark mode styles when creating new components**
   - Use `dark:` prefix for dark-specific styles
   - Test both light and dark modes

2. **Maintain sufficient contrast**
   - Dark mode: Light text on dark backgrounds
   - Light mode: Dark text on light backgrounds

3. **Use semi-transparent overlays for depth**
   ```tsx
   className="bg-green-900/20" // 20% opacity
   ```

4. **Keep brand colors consistent**
   - Green and purple should remain recognizable
   - Adjust brightness, not hue

5. **Smooth transitions**
   ```tsx
   className="transition-colors duration-200"
   ```

## 📱 Mobile Support

The dark mode toggle is currently in the desktop navbar. For mobile:

```tsx
// Add to mobile menu
<div className="md:hidden">
  <DarkModeToggle />
</div>
```

## 🔍 Testing Dark Mode

1. **Toggle the dark mode button** in the navbar (☀️/🌙)
2. **Check localStorage**: `localStorage.getItem('darkMode')`
3. **Test system preference**: Change OS theme and refresh
4. **Verify persistence**: Refresh page, mode should remain

## 🚀 What's Already Dark Mode Ready

- ✅ Navbar with toggle button
- ✅ Layout wrapper
- ✅ Base typography

## 📋 Components That Need Dark Mode Styles

You'll need to add `dark:` classes to:
- Home page sections
- Footer
- Get Involved page
- News/Projects pages
- Gallery page
- All CMS-rendered blocks

## 💡 Quick Tips

### Convert existing color quickly:
1. Find `bg-white` → add `dark:bg-gray-900`
2. Find `text-gray-900` → add `dark:text-gray-100`
3. Find `text-gray-600` → add `dark:text-gray-400`
4. Find `border-gray-200` → add `dark:border-gray-700`

### For images:
```tsx
<img className="dark:opacity-90" /> // Slightly dim in dark mode
<img className="dark:brightness-90" /> // Reduce brightness
```

### For cards/panels:
```tsx
className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50"
```

## 🎓 Resources

- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [Dark Mode Best Practices](https://web.dev/prefers-color-scheme/)
- [Material Design Dark Theme](https://material.io/design/color/dark-theme.html)

---

**Happy Dark Mode Coding! 🌙**

