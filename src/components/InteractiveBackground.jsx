import LiquidEther from './reactbits/LiquidEther';

export default function InteractiveBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <LiquidEther colors={['#5227FF', '#FF9FFC', '#B19EEF']} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-40" />
        </div>
    );
}
