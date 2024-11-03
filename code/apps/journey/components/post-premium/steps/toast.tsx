import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Image from "next/image";

const documents = [
  {
    title: "Policy Summary",
    icon: "📄",
    downloadUrl: "/docs/policy-summary.pdf",
  },
  {
    title: "Certificate of Insurance",
    icon: "📄",
    downloadUrl: "/docs/certificate.pdf",
  },
  {
    title: "Welcome Package",
    icon: "📄",
    downloadUrl: "/docs/welcome-package.pdf",
  },
];

export function ToastPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-100px)] overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-4xl p-6 space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-3xl font-semibold text-left">
            Congratulations! 🎉 Your life insurance is set.
          </h1>
          <p className="text-muted-foreground">
            You're ready for peace of mind.
          </p>
        </motion.div>

        <div className="flex flex-col-reverse sm:flex-row gap-8 items-start">
          <div className="space-y-6 flex-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-medium">
                Here are the key documents for your policy:
              </h2>

              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <motion.div
                    key={doc.title}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{doc.icon}</span>
                      <span className="font-medium">{doc.title}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <p className="text-sm text-muted-foreground">Any questions?</p>
              <p className="text-sm text-muted-foreground">
                No worries! Everything has also been sent to your email. Feel
                free to close the page whenever you're ready. 😊
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full sm:w-auto"
          >
            <Image
              src="/icons/congratulations.svg"
              alt="Celebration illustration"
              width={200}
              height={200}
              className="hidden sm:block"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
