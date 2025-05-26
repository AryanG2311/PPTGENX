  import PptxGenJS from 'pptxgenjs';

  // Enhanced type definitions
  interface Slide {
    title: string;
    content: string | boolean;
    layout?: 'text' | 'textImage' | 'comparison' | 'quote' | 'stats';
    imageUrl?: string;
  }

  interface ThemeConfig {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    darkText: string;
    titleFont: string;
    bodyFont: string;
    chartColors: string[];
  }

  type ThemeOption = "tech" | "vibrant" | "minimal" | "modern" | "corporate" | "startup";

  interface BackgroundImages {
    cover: string;
    contentLight: string;
    contentDark: string;
    thanks: string;
    techPattern: string;
  }

  // Enhanced theme configurations
  const themes: Record<ThemeOption, ThemeConfig> = {
    tech: {
      primary: "0A1128",
      secondary: "001F54",
      accent: "00A6FB",
      text: "FFFFFF",
      darkText: "1A1A1A",
      titleFont: "Montserrat",
      bodyFont: "Roboto",
      chartColors: ["00A6FB", "0582CA", "006494", "003554", "051923"]
    },
    vibrant: {
      primary: "7209B7",
      secondary: "560BAD",
      accent: "4CC9F0",
      text: "FFFFFF",
      darkText: "1A1A1A",
      titleFont: "Poppins",
      bodyFont: "Nunito",
      chartColors: ["4CC9F0", "4895EF", "4361EE", "3F37C9", "3A0CA3"]
    },
    minimal: {
      primary: "111827",
      secondary: "1F2937",
      accent: "10B981",
      text: "FFFFFF",
      darkText: "333333",
      titleFont: "Helvetica",
      bodyFont: "Helvetica",
      chartColors: ["10B981", "059669", "047857", "065F46", "064E3B"]
    },
    modern: {
      primary: "1F2937",
      secondary: "374151",
      accent: "3B82F6",
      text: "FFFFFF",
      darkText: "2C3E50",
      titleFont: "Montserrat",
      bodyFont: "Open Sans",
      chartColors: ["3B82F6", "2563EB", "1D4ED8", "1E40AF", "1E3A8A"]
    },
    corporate: {
      primary: "312E81",
      secondary: "252262",
      accent: "F59E0B",
      text: "FFFFFF",
      darkText: "1F2937",
      titleFont: "Calibri",
      bodyFont: "Calibri",
      chartColors: ["F59E0B", "F97316", "EF4444", "EC4899", "8B5CF6"]
    },
    startup: {
      primary: "1A1A2E",
      secondary: "16213E",
      accent: "FF6B6B",
      text: "FFFFFF",
      darkText: "333333",
      titleFont: "Inter",
      bodyFont: "Inter",
      chartColors: ["FF6B6B", "FF8E8E", "4ECDC4", "45B7D1", "3D7BCC"]
    }
  };

  const backgroundImages = {
    cover: "https://static.vecteezy.com/system/resources/thumbnails/031/624/578/small_2x/a-green-wall-with-a-white-background-ai-generated-photo.jpg", // Added `&fm=jpg`
    contentLight: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80&fm=jpg",
    contentDark: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=2000&q=80&fm=jpg",
    thanks: "https://t3.ftcdn.net/jpg/06/18/01/40/360_F_618014055_W8zjPXrGNMEvu7aYWmECUZvK2wpPN1N8.jpg",
    techPattern: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjcyMi1hdW0tMzFiLWpvYjU5OC5qcGc.jpg"
  };

    export const generatePptxFromSlides = async (
      slides: Slide[],
      projectName: string = "My Hackathon Project",
      theme: ThemeOption = "tech",
      companyName?: string
  ): Promise<void> => {
    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";
    
    // Define slide master
    pptx.defineSlideMaster({
      title: "MASTER_SLIDE",

      background: { path: backgroundImages.techPattern },
      objects: [
        { 
          rect: { 
            x: 0, y: 0, w: 0.2, h: "100%", 
            fill: { color: themes[theme].accent, transparency: 5 } 
          } 
        },
        { 
          rect: { 
            x: 0, y: 5.7, w: "100%", h: 0.18, 
            fill: { color: themes[theme].accent , transparency: 5 } 
          } 
        },
        { 
          text: { 
            text: companyName || "Hackathon Project", 
            options: { 
              x: 0.3, y: 6, w: 5, h: 0.4,
              fontSize: 12, color: themes[theme].text, 
              fontFace: themes[theme].bodyFont 
            } 
          } 
        }
      ]
    });

    // Helper function to add decorative elements
    const addDecorativeElements = (slide: PptxGenJS.Slide) => {
      slide.addShape(pptx.ShapeType.rect, {
        x: 9.7, y: 0.1, w: 0.2, h: 0.2,
        fill: { color: themes[theme].accent },
        rotate: 45
      });
      
      for (let i = 0; i < 5; i++) {
        slide.addShape(pptx.ShapeType.ellipse, {
          x: 0.5 + (i * 0.3), y: 0.2, w: 0.05, h: 0.05,
          fill: { color: themes[theme].accent, transparency: 30 }
        });
      }
    };

    // Cover Slide
    const coverSlide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
    coverSlide.background = {
      path: backgroundImages.cover  , // Or a local file for desktop usage
    };
    
    coverSlide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: "100%", h: "100%",
      fill: { 
        color: themes[theme].primary, 
        transparency: 100 
      }
    });

    coverSlide.addText(projectName, {
      x: 0.5, y: 1.5, w: "90%", h: 1.5,
      align: "center", fontSize: 48, bold: true,
      color: themes[theme].text, fontFace: themes[theme].titleFont,
      shadow: { type: "outer", blur: 2, offset: 1, color: "cefad0", opacity: 1 }
    });

    coverSlide.addText("PITCH DECK", {
      x: 0.5, y: 3, w: "90%", h: 0.8,
      align: "center", fontSize: 28, color: themes[theme].accent,
      fontFace: themes[theme].titleFont,  charSpacing: 2 // This is the valid property name in pptxgenjs

    });

    coverSlide.addShape(pptx.ShapeType.line, {
      x: 3, y: 3.8, w: 4, h: 0,
      line: { color: themes[theme].accent, width: 2, dashType: "dash" }
    });

    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    });
    coverSlide.addText(`Presented on ${today}`, {
      x: 0.5, y: 4.5, w: "90%", h: 0.5,
      align: "center", fontSize: 16, color: themes[theme].text,
      fontFace: themes[theme].bodyFont
    });

    // Content Slides
    slides.forEach((slide, index) => {
      const pptSlide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
    
      const bgImagePath = theme === "minimal" || theme === "corporate"
        ? backgroundImages.contentDark
        : backgroundImages.techPattern;
    
      pptSlide.background = { path: bgImagePath };
    
      const content = typeof slide.content === "boolean"
        ? (slide.content ? "Yes" : "No")
        : slide.content.toString();
    
      // Title with underline
      pptSlide.addText(slide.title, {
        x: 0.8,
        y: 0.5,
        w: "85%",
        h: 0.8,
        fontSize: 36,
        bold: true,
        color: themes[theme].primary,
        fontFace: themes[theme].titleFont,
        lineSpacing: 28
      });
    
      pptSlide.addShape(pptx.ShapeType.line, {
        x: 0.8,
        y: 1.2,
        w: 4,
        h: 0,
        line: { color: themes[theme].accent, width: 3 }
      });
    
      if (slide.layout === 'textImage' && slide.imageUrl) {
        pptSlide.addText(content, {
          x: 0.8,
          y: 1.5,
          w: "45%",
          h: 4,
          fontSize: 20,
          color: themes[theme].darkText,
          fontFace: themes[theme].bodyFont,
          bullet: { code: "25AA" },
          lineSpacing: 24,
          paraSpaceBefore: 12
        });
    
        pptSlide.addImage({
          path: slide.imageUrl,
          x: 5.5,
          y: 1.5,
          w: 4.5,
          h: 4,
          rounding: true,
          shadow: { type: "outer", blur: 3, offset: 2, opacity: 0.3 }
        });
    
      } else if (slide.layout === 'comparison') {
        const [left, right] = content.split('\nvs\n') || [content, ''];
        pptSlide.addText(left, {
          x: 0.8,
          y: 1.5,
          w: "40%",
          h: 3.5,
          fontSize: 20,
          color: themes[theme].darkText,
          fontFace: themes[theme].bodyFont,
          fill: { color: themes[theme].accent, transparency: 90 },
          align: "center",
          valign: "middle",
          lineSpacing: 24
        });
    
        pptSlide.addText("VS", {
          x: 4.9,
          y: 3,
          w: 0.5,
          h: 0.5,
          fontSize: 24,
          bold: true,
          color: themes[theme].accent,
          align: "center",
          valign: "middle"
        });
    
        pptSlide.addText(right, {
          x: 5.8,
          y: 1.5,
          w: "40%",
          h: 3.5,
          fontSize: 20,
          color: themes[theme].darkText,
          fontFace: themes[theme].bodyFont,
          fill: { color: themes[theme].secondary, transparency: 90 },
          align: "center",
          valign: "middle",
          lineSpacing: 24
        });
    
      } else if (slide.layout === 'stats') {
        const stats = content.split('\n').filter(Boolean);
        stats.forEach((stat, i) => {
          const [label, value] = stat.split(':');
          const xPos = 1 + (i % 2) * 4.5;
          const yPos = 1.5 + Math.floor(i / 2) * 2;
    
          if (value) {
            pptSlide.addText(label.trim(), {
              x: xPos,
              y: yPos,
              w: 3.5,
              h: 0.5,
              fontSize: 16,
              color: themes[theme].darkText,
              fontFace: themes[theme].bodyFont,
              lineSpacing: 20
            });
    
            pptSlide.addText(value.trim(), {
              x: xPos,
              y: yPos + 0.6,
              w: 3.5,
              h: 0.8,
              fontSize: 32,
              bold: true,
              color: themes[theme].accent,
              fontFace: themes[theme].titleFont,
              lineSpacing: 28
            });
          }
        });
    
      } else {
        // Glassmorphic container background (light green with transparency)
        pptSlide.addShape(pptx.ShapeType.roundRect, {
          x: 0.7,
          y: 1.7, // more gap after title
          w: "86%",
          h: 4.7,
          fill: { color: "91E5A9", transparency: 18 }, // light green with 25% transparency
          line: { color: "91E5A9", width: 1 },
          shadow: { type: "outer", blur: 5, offset: 2, opacity: 0.4 },
        });
      
        const bulletPoints = content
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => ({
            text: line.trim(),
            options: {
              bullet: true,
              color: "#1A1A1A",
              fontSize: 20,
              fontFace: themes[theme].bodyFont,
              paraSpaceBefore: 8,
              lineSpacing: 24
            }
          }));
      
        pptSlide.addText(bulletPoints, {
          x: 1.0,
          y: 2.0, // inside the box, slightly down
          w: "82%",
          h: 4.2,
          valign: 'top',
          align: 'left'
        });
      }
      
    
      // Slide number
      pptSlide.addText(`${index + 1}`, {
        x: 9.2,
        y: 0.2,
        w: 0.5,
        h: 0.5,
        fontSize: 16,
        color: themes[theme].accent,
        fontFace: themes[theme].titleFont
      });
    
      // Decorative elements
      addDecorativeElements(pptSlide);
    
      // Add fun/symbolic icon (🎉 this is the NEW PART!)
      const getSlideSymbol = (title: string) => {
        const lower = title.toLowerCase();
        if (lower.includes("problem")) return "/images/icons/question.png";
        if (lower.includes("case")) return "/images/icons/sad-human.png";
        if (lower.includes("solution")) return "/images/icons/lightbulb.png";
        if (lower.includes("unique") || lower.includes("data")) return "/images/icons/graph.png";
        if (lower.includes("works")) return "/images/icons/scale.png";
        if (lower.includes("future")) return "/images/icons/check.png";
        return "/images/icons/rocket.png"; // default
      };
    
      const symbolPath = getSlideSymbol(slide.title);
      pptSlide.addImage({
        path: symbolPath,
        x: 7.5,
        y: 5,
        w: 2,
        h: 2,
        rounding: true
      });
    });
    
    
    // Thank You Slide
    const thankSlide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
    thankSlide.background = { path: backgroundImages.thanks };
    
    thankSlide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: "100%", h: "100%",
      fill: { 
        color: themes[theme].primary, 
        transparency: 100
      }
    });

    thankSlide.addText("Thank You!", {
      x: 0.5, y: 2, w: "90%", h: 1.5,
      align: "center", fontSize: 64, bold: true,
      color: themes[theme].text, fontFace: themes[theme].titleFont,
      shadow: { type: "outer", blur: 3, offset: 2, color: "000000", opacity: 0.5 }
    });

    thankSlide.addText("Let's build something amazing together", {
      x: 0.5, y: 3.5, w: "90%", h: 0.8,
      align: "center", fontSize: 24, italic: true,
      color: themes[theme].text, fontFace: themes[theme].bodyFont
    });

    thankSlide.addText("team@hackathon.com | @hackathonteam", {
      x: 0.5, y: 4.5, w: "90%", h: 0.5,
      align: "center", fontSize: 18,
      color: themes[theme].accent, fontFace: themes[theme].bodyFont
    });

    // Generate file
    await pptx.writeFile({ 
      fileName: `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_Pitch_Deck.pptx`,
      compression: true
    });
  };