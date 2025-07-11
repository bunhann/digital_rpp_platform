import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  FaYoutube,
  FaFacebookF,
  FaTelegramPlane,
  FaEnvelope,
  FaTiktok,
  FaPhone,
  FaMoon,
  FaSun,
  FaDesktop,
  FaMapMarkerAlt,
  FaCopy,
  FaRegHeart,
} from "react-icons/fa";
import { IoLogoYoutube, IoMdGlobe } from "react-icons/io";
import { PiTelegramLogoLight } from "react-icons/pi";
import { Toast } from "./components/ui/toast";

interface LinkItem {
  icon: React.ReactElement;
  label: string;
  href: string;
  onClick?: () => void;
}

interface ToastState {
  isVisible: boolean;
  message: string;
  type: "success" | "error" | "info";
}

function App() {
  const [theme, setTheme] = useState<string>("light");

  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("ចម្លងបានជោគជ័យ!", "success");
    } catch (err) {
      showToast("មិនអាចចម្លងបាន!", "error");
    }
  };

  const links: LinkItem[] = [
    {
      icon: <IoMdGlobe size={24} />,
      label: "គេហទំព័ររបស់យើង",
      href: "https://parenting-tips.info/",
    },
    {
      icon: <FaFacebookF size={24} />,
      label: "ទំព័រហ្វេសប៊ុករបស់យើង",
      href: "https://www.facebook.com/profile.php?id=61562094251488",
    },
    {
      icon: <IoLogoYoutube size={24} />,
      label: "ឆានែល Youtube របស់យើង",
      href: "https://www.youtube.com/channel/UCJBlwUcjxayND5NgtWpjv_g",
    },
    {
      icon: <PiTelegramLogoLight size={24} />,
      label: "ឆានែល Telegram របស់យើង",
      href: "https://t.me/positive_parenting_tips",
    },
    {
      icon: <FaTiktok size={24} />,
      label: "TikTok - របស់យើង",
      href: "https://www.tiktok.com/@parentingtipscambodia?_t=zs-8vquxid76wo",
    },
    {
      icon: <FaPhone size={24} />,
      label: "ទំនាក់ទំនងមកកាន់យើង",
      href: "#contact",
      onClick: () => setContactDialogOpen(true),
    },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", systemPrefersDark);
    }
  }, [theme]);

  const handleLinkClick = (link: LinkItem, e: React.MouseEvent) => {
    if (link.onClick) {
      e.preventDefault();
      link.onClick();
    }
  };

  return (
    <>
      <main className="min-h-screen w-full bg-pink-100 dark:bg-gray-800 p-4 flex flex-col items-center justify-center text-gray-800 dark:text-white relative">
        <div className="absolute top-4 right-4 flex gap-2 text-lg items-center">
          <button onClick={() => setTheme("light")} aria-label="Light mode">
            {" "}
            <FaSun />{" "}
          </button>
          <button onClick={() => setTheme("dark")} aria-label="Dark mode">
            {" "}
            <FaMoon />{" "}
          </button>
          <button onClick={() => setTheme("system")} aria-label="System mode">
            {" "}
            <FaDesktop />{" "}
          </button>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 md:w-36 md:h-36 bg-white rounded-full shadow flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 h-20 md:w-30 md:h-30 object-contain"
            />
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold mb-4 px-4">
          គន្លឹះចិញ្ចឹមកូន
        </h1>
        <h3 className="text-sm md:text-md font-semibold mb-4 px-4">
          សូមស្វាគមន៍ការមកកាន់សហគមន៍ គន្លឹះចិញ្ចឹមកូន (Positive Parenting)
          របស់យើង!
        </h3>

        <div className="flex gap-4 justify-center text-xl md:text-2xl mb-6 flex-wrap px-4">
          {[
            "https://www.youtube.com/channel/UCJBlwUcjxayND5NgtWpjv_g", 
            "https://www.facebook.com/profile.php?id=61562094251488", 
            "https://t.me/positive_parenting_tips", 
            "mailto:rpp.cambodia@savethechildren.org"
          ].map((href, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-110"
            >
              {
                [
                  <FaYoutube />,
                  <FaFacebookF />,
                  <FaTelegramPlane />,
                  <FaEnvelope />,
                ][i]
              }
            </a>
          ))}
        </div>

        <div className="w-full max-w-md mx-auto px-4 flex flex-col gap-4">
          {links.map((link, index) => (
            <a
              href={link.href}
              target={link.onClick ? undefined : "_blank"}
              rel={link.onClick ? undefined : "noopener noreferrer"}
              key={index}
              className="transition transform hover:scale-105"
              onClick={(e) => handleLinkClick(link, e)}
            >
              <Card className="rounded-2xl shadow-md">
                <CardContent className="flex items-center gap-4 p-4">
                  {link.icon}
                  <span className="text-base font-medium">{link.label}</span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </main>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="text-gray-800 dark:text-white">
          <DialogClose onClick={() => setContactDialogOpen(false)} />
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FaRegHeart className="text-red-500" />
              ទំនាក់ទំនងមកកាន់យើង
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">អាសយដ្ឋាន៖</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ផ្ទះលេខ ៥, ផ្លូវ ២៤២, សង្កាត់ចតុមុខ, ខណ្ឌដូនពេញ,
                  រាជធានីភ្នំពេញ
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FaPhone className="text-red-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2">លេខទូរស័ព្ទ៖</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">+855 92 881 545</span>
                    <button
                      onClick={() => copyToClipboard("+85592881545")}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="ចម្លងលេខទូរស័ព្ទ"
                    >
                      <FaCopy size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">+855 23 223 403</span>
                    <button
                      onClick={() => copyToClipboard("+85523223403")}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="ចម្លងលេខទូរស័ព្ទ"
                    >
                      <FaCopy size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FaEnvelope className="text-red-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">អ៊ីមែល៖</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    rpp.cambodia@savethechildren.org
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard("rpp.cambodia@savethechildren.org")
                    }
                    className="text-red-500 hover:text-red-600 transition-colors"
                    title="ចម្លងអ៊ីមែល"
                  >
                    <FaCopy size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-red-900 dark:text-red-300">
                ម៉ោងធ្វើការ៖
              </h4>
              <div className="text-sm space-y-1">
                <p>ច័ន្ទ - សុក្រ: ៨:០០ព្រឹក - ៥:០០ល្ងាច</p>
                <p>សៅរ៍ - អាទិត្យ: បិទ</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
export default App;
