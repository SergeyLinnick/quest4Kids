declare module "canvas-confetti" {
  function confetti(options?: {
    particleCount?: number;
    spread?: number;
    [key: string]: unknown;
  }): Promise<void>;
  export default confetti;
}
