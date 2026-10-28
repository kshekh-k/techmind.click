import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  AlertCircle,
  Bug,
  Clock,
  Facebook,
  HelpCircle,
  Instagram,
  Linkedin,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Contactus() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Contact TechMind Support &amp; Editorial
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Have feedback on our text tools, spotted an edge-case bug, or want to suggest a new utility?
          Reach out directly to the site operator. We review every message and use your feedback to
          improve tool reliability and educational guides.
        </p>
      </div>

      {/* Inquiry Guidelines Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <Bug className="h-4 w-4" />
            <span>Bug Reports</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            If a tool failed to format, clean, or export your data correctly, please provide the details
            outlined in the checklist below so we can replicate and fix it.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Lightbulb className="h-4 w-4" />
            <span>Feature Suggestions</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Need a specific case conversion format, slug rule, or PDF option? Describe your workflow
            and we will consider adding it to the roadmap.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <MessageSquare className="h-4 w-4" />
            <span>Editorial &amp; Privacy Inquiries</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            For questions regarding our privacy disclosures, editorial policies, or corrections to our
            educational guides and tutorials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                Send Us a Message
              </CardTitle>
              <p className="text-xs text-slate-500">
                Fields marked with an asterisk (*) are required.
              </p>
            </CardHeader>
            <CardContent>
              <form action="/api/contact" method="POST" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold text-slate-700">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Alex Johnson"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                      Your Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. alex@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType" className="text-xs font-semibold text-slate-700">
                    Inquiry Type
                  </Label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    defaultValue="bug"
                  >
                    <option value="bug">Bug Report (Tool issue or edge case error)</option>
                    <option value="feature">Feature Request or Format Suggestion</option>
                    <option value="editorial">Editorial / Content Feedback</option>
                    <option value="privacy">Privacy / Legal Question</option>
                    <option value="other">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-semibold text-slate-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="For bug reports: Please include the tool URL, your browser/OS, sample input, and what went wrong."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                  Send Message
                </Button>
              </form>

              {/* Social Follow */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Connect with the founder:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://x.com/kamranshekh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="rounded-full border p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <FaXTwitter className="size-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kshekh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-full border p-1.5 text-slate-500 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="size-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/kshekh01011986"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="rounded-full border p-1.5 text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <Facebook className="size-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/kshekh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="rounded-full border p-1.5 text-slate-500 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="size-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info & Bug Checklist Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Bug Reporting Guide Card */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5 space-y-3">
            <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-indigo-700 shrink-0" />
              <span>How to Report a Tool Bug</span>
            </h3>
            <p className="text-xs text-indigo-900 leading-relaxed">
              To help us diagnose and fix issues quickly, please include as much of the following as possible:
            </p>
            <ul className="text-xs text-indigo-950 space-y-1.5 list-disc pl-5">
              <li>
                <strong>Tool Page URL:</strong> (e.g. <code>/text-format</code>, <code>/image-to-pdf</code>, <code>/qr-code-generator</code>)
              </li>
              <li>
                <strong>Input Example:</strong> A short snippet of text or image format that caused the unexpected result
              </li>
              <li>
                <strong>Expected vs. Actual:</strong> What you expected the tool to do versus what happened
              </li>
              <li>
                <strong>Device &amp; Browser:</strong> (e.g. Chrome 124 on Windows 11, Safari on iPhone iOS 17)
              </li>
              <li>
                <strong>Console / Error Message:</strong> Any visible error toast or message
              </li>
            </ul>
          </div>

          {/* Contact Details Card */}
          <Card className="border-slate-200 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">
                Direct Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs md:text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-700 shrink-0 mt-0.5">
                  <Mail className="size-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Direct Emails</h4>
                  <p className="text-slate-600">
                    <a href="mailto:info@techmind.click" className="hover:text-purple-700 underline">
                      info@techmind.click
                    </a>
                    {" / "}
                    <a href="mailto:kshekh@gmail.com" className="hover:text-purple-700 underline">
                      kshekh@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-700 shrink-0 mt-0.5">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Mailing &amp; Operating Address</h4>
                  <p className="text-slate-600">
                    Plot No 47, Narayanpuri, Jhotwara<br />
                    Jaipur, Rajasthan 302012, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t pt-3">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-700 shrink-0 mt-0.5">
                  <Clock className="size-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Response Expectations</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    We typically review and reply to inquiries within <strong>2 to 3 business days</strong> (Monday through Friday).
                    Usability bugs affecting live conversions are prioritized immediately in our release queue.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
