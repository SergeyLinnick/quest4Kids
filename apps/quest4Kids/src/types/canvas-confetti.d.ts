declare module "canvas-confetti" {
  function confetti(options?: {
    particleCount?: number;
    spread?: number;
    [key: string]: any;
  }): Promise<void>;
  export default confetti;
}
