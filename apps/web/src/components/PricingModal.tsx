import { motion } from 'framer-motion';

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const PricingModal = ({ open, onClose, onCheckout }: PricingModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md rounded-2xl p-6"
      >
        <h3 className="text-2xl font-semibold">Unlock all prompts</h3>
        <p className="mt-2 text-sm text-slate-300">Save hours of trial-and-error — for $11.99/month.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200">
          <li>One subscription. Thousands of high-performing prompts.</li>
          <li>Global unlock + copy anywhere in the library.</li>
          <li>Stripe Checkout in production, dev stub available.</li>
        </ul>
        <div className="mt-6 flex gap-3">
          <button className="rounded-xl bg-violet-500 px-4 py-2 font-medium" onClick={onCheckout} type="button">Checkout</button>
          <button className="rounded-xl border border-borderglass px-4 py-2" onClick={onClose} type="button">Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};
