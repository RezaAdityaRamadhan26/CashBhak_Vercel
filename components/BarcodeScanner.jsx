"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, X, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

export default function BarcodeScanner({ onScanSuccess, onClose, isOpen }) {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);
    const isMountedRef = useRef(true);

    const stopScanner = async () => {
        try {
            if (html5QrCodeRef.current) {
                if (html5QrCodeRef.current.isScanning) {
                    await html5QrCodeRef.current.stop();
                }
                html5QrCodeRef.current.clear();
                html5QrCodeRef.current = null;
            }
        } catch (err) {
            console.error("Error stopping scanner:", err);
        }
        if (isMountedRef.current) {
            setIsScanning(false);
            setIsInitialized(false);
        }
    };

    const startScanner = async () => {
        if (!scannerRef.current || html5QrCodeRef.current) return;

        try {
            setError(null);
            setIsScanning(true);

            html5QrCodeRef.current = new Html5Qrcode("barcode-scanner");

            const config = {
                fps: 10,
                qrbox: { width: 250, height: 150 },
                aspectRatio: 1.777778,
            };

            await html5QrCodeRef.current.start(
                { facingMode: "environment" },
                config,
                (decodedText) => {
                    onScanSuccess(decodedText);
                    stopScanner();
                    onClose();
                },
                () => {
                    // Ignore scan errors (no QR code found in frame)
                }
            );
        } catch (err) {
            console.error("Error starting scanner:", err);
            if (isMountedRef.current) {
                setError(err.message || "Gagal mengakses kamera. Pastikan izin kamera diberikan.");
                setIsScanning(false);
            }
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            stopScanner();
        };
    }, []);

    // Handle dialog open state changes
    const handleOpenChange = (open) => {
        if (!open) {
            stopScanner();
            onClose();
        }
    };

    // Initialize scanner when dialog content is ready
    const handleDialogContentMount = () => {
        if (!isInitialized && isOpen) {
            setIsInitialized(true);
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                if (isMountedRef.current && isOpen) {
                    startScanner();
                }
            }, 100);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                className="sm:max-w-[500px] p-0 gap-0 rounded-2xl overflow-hidden border-0"
                onAnimationEnd={handleDialogContentMount}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] p-4 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <Camera className="h-5 w-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-bold text-white">Scan Barcode</DialogTitle>
                                <p className="text-white/80 text-sm">Arahkan kamera ke barcode produk</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scanner Area */}
                <div className="p-4">
                    <div className="relative bg-black rounded-xl overflow-hidden" style={{ minHeight: "300px" }}>
                        {/* Scanner Container */}
                        <div
                            id="barcode-scanner"
                            ref={scannerRef}
                            className="w-full"
                            style={{ minHeight: "300px" }}
                        />

                        {/* Scanning Overlay */}
                        {isScanning && !error && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="relative">
                                    {/* Scan Frame */}
                                    <div className="w-64 h-40 border-2 border-[var(--primary-custom)] rounded-lg relative">
                                        {/* Corner Decorations */}
                                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[var(--primary-custom)] rounded-tl-lg" />
                                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[var(--primary-custom)] rounded-tr-lg" />
                                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[var(--primary-custom)] rounded-bl-lg" />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[var(--primary-custom)] rounded-br-lg" />

                                        {/* Scanning Line Animation */}
                                        <div className="absolute inset-x-0 top-0 h-0.5 bg-[var(--primary-custom)] animate-scan-line" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {!isScanning && !error && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                <div className="text-center text-white">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                                    <p className="text-sm">Memuat kamera...</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                <div className="text-center text-white p-4">
                                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <X className="h-8 w-8 text-red-500" />
                                    </div>
                                    <p className="text-sm text-red-400 mb-4">{error}</p>
                                    <button
                                        onClick={startScanner}
                                        className="px-4 py-2 bg-[var(--primary-custom)] text-white rounded-lg text-sm hover:bg-[var(--primary-custom)]/90"
                                    >
                                        Coba Lagi
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-600 text-center">
                            💡 Posisikan barcode di dalam kotak scanning untuk hasil terbaik
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4">
                    <button
                        onClick={() => handleOpenChange(false)}
                        className="w-full py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                        Batal
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
