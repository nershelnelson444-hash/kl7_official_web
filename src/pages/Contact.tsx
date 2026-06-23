import React, { useState } from 'react';
import FadeIn from '../components/FadeIn';
import StaggerContainer, { StaggerItem } from '../components/StaggerContainer';
import Button from '../components/Button';
import { supabase } from '../config/supabaseclient';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email_address: '',
    phone_number: '',
    subject: 'General Enquiry',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from('contact_messages').insert([{
      full_name: formData.full_name,
      email_address: formData.email_address,
      phone_number: formData.phone_number || null,
      subject: formData.subject,
      message: formData.message,
    }]);

    setIsLoading(false);

    if (error) {
      console.error('Supabase error:', error);
      setSubmitError('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setFormData({
      full_name: '',
      email_address: '',
      phone_number: '',
      subject: 'General Enquiry',
      message: '',
    });
  };

  return (
    <div className="w-full min-h-screen bg-background-main flex flex-col overflow-hidden">

      {/* ─── PAGE HERO ─────────────────────────────────── */}
      <section className="w-full bg-background-main pt-[104px] pb-0 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 py-20">
          <FadeIn direction="up">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold uppercase tracking-wider text-text-extra-muted">Get in Touch</span>
              <h1 className="text-[56px] font-bold leading-none tracking-[-0.03em]">Contact Us</h1>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── MAIN CONTENT ──────────────────────────────── */}
      <section className="w-full bg-background-main pb-36 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col lg:flex-row gap-16">

          {/* Left: Info */}
          <FadeIn direction="up" className="flex-1">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6 max-w-xl">
                <p className="text-[20px] text-text-black-muted leading-relaxed">
                  Whether you're looking to purchase your next bike, sell your current one, or explore our financing options, our team is ready to assist you.
                </p>
              </div>

              <StaggerContainer delayChildren={0.2} staggerChildren={0.1} className="flex flex-col gap-8">
                <StaggerItem>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[24px] font-bold tracking-[-0.03em]">Showroom</h3>
                    <p className="text-[18px] text-text-black-muted">
                      No. 12, Jalan Kiara 3<br />
                      Mont Kiara, 50480 Kuala Lumpur<br />
                      Malaysia
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[24px] font-bold tracking-[-0.03em]">Contact</h3>
                    <p className="text-[18px] text-text-black-muted">
                      Sales: +60 12-345 6789<br />
                      Service: +60 12-345 6788<br />
                      Email: hello@kl7garage.com
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[24px] font-bold tracking-[-0.03em]">Hours</h3>
                    <p className="text-[18px] text-text-black-muted">
                      Monday – Friday: 9:00 AM – 7:00 PM<br />
                      Saturday: 10:00 AM – 5:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn direction="up" delay={0.2} className="flex-1">
            <div className="bg-white border border-grey-main rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 gap-6 text-center">
                  <div className="w-16 h-16 bg-background-main rounded-full flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="text-[32px] font-bold leading-none tracking-[-0.03em]">Message Sent</h2>
                  <p className="text-text-black-muted max-w-xs">We'll get back to you within 24 hours. Thank you for reaching out!</p>
                  <Button
                    variant="primary"
                    onClick={handleReset}
                    className="mt-4"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-[32px] font-bold leading-none tracking-[-0.03em] mb-4">Send a Message</h2>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm text-text-black-muted uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-background-mid border border-grey-main rounded-xl px-4 py-4 outline-none focus:border-black-main transition-colors font-medium text-text-black"
                      placeholder="Ahmad Hakim"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm text-text-black-muted uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email_address"
                      value={formData.email_address}
                      onChange={handleChange}
                      required
                      className="w-full bg-background-mid border border-grey-main rounded-xl px-4 py-4 outline-none focus:border-black-main transition-colors font-medium text-text-black"
                      placeholder="ahmad@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm text-text-black-muted uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full bg-background-mid border border-grey-main rounded-xl px-4 py-4 outline-none focus:border-black-main transition-colors font-medium text-text-black"
                      placeholder="+60 12-000 0000"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm text-text-black-muted uppercase tracking-wider">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-background-mid border border-grey-main rounded-xl px-4 py-4 outline-none focus:border-black-main transition-colors font-medium text-text-black appearance-none"
                    >
                      <option>General Enquiry</option>
                      <option>Bike Enquiry</option>
                      <option>Sell / Trade-In</option>
                      <option>Financing Options</option>
                      <option>After-Sales Support</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm text-text-black-muted uppercase tracking-wider">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-background-mid border border-grey-main rounded-xl px-4 py-4 outline-none focus:border-black-main transition-colors font-medium text-text-black resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-sm text-center font-medium">{submitError}</p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
