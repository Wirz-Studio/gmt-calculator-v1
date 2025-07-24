import React, { useState, useEffect } from 'react';

// Main App component for the GMT Calculator
const App = () => {
    // State variables for input fields
    // Initialize with 0 to prevent NaN issues on initial render or empty inputs
    const [netAccountingProfitLoss, setNetAccountingProfitLoss] = useState(0);
    const [coveredTaxCurrent, setCoveredTaxCurrent] = useState(0);
    const [coveredTaxDeferred, setCoveredTaxDeferred] = useState(0);
    const [excludedDividends, setExcludedDividends] = useState(0);
    const [excludedEquityGainsLosses, setExcludedEquityGainsLosses] = useState(0);
    const [nonDeductibleExpenses, setNonDeductibleExpenses] = useState(0);
    const [governmentFinesPenalties, setGovernmentFinesPenalties] = useState(0);
    const [fairValueAdjustments, setFairValueAdjustments] = useState(0);
    const [taxTransparentEntityIncome, setTaxTransparentEntityIncome] = useState(0);
    const [consolidatedRevenue, setConsolidatedRevenue] = useState(0); // Now in full EUR for threshold check

    // State variables for calculated results
    const [gloBEIncomeLoss, setGloBEIncomeLoss] = useState(0);
    const [adjustedCoveredTax, setAdjustedCoveredTax] = useState(0);
    const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
    const [topUpTax, setTopUpTax] = useState(0);
    const [isThresholdMet, setIsThresholdMet] = useState(false);

    // Constants for calculation
    const GLOBAL_MINIMUM_TAX_RATE = 0.15; // 15%
    const REVENUE_THRESHOLD_EUR = 750000000; // EUR 750 million (full value)

    // Effect hook to recalculate whenever input values change
    useEffect(() => {
        calculateGMT();
    }, [
        netAccountingProfitLoss,
        coveredTaxCurrent,
        coveredTaxDeferred,
        excludedDividends,
        excludedEquityGainsLosses,
        nonDeductibleExpenses,
        governmentFinesPenalties,
        fairValueAdjustments,
        taxTransparentEntityIncome,
        consolidatedRevenue // Consolidated revenue is now in full EUR for the threshold check
    ]);

    // Function to perform the GMT calculation
    const calculateGMT = () => {
        // Step 1: Check if the consolidated revenue threshold is met (now directly in full EUR)
        const thresholdMet = consolidatedRevenue >= REVENUE_THRESHOLD_EUR;
        setIsThresholdMet(thresholdMet);

        if (!thresholdMet) {
            // If threshold not met, no GMT calculation is needed
            setGloBEIncomeLoss(0);
            setAdjustedCoveredTax(0);
            setEffectiveTaxRate(0);
            setTopUpTax(0);
            return;
        }

        // Step 2: Calculate GloBE Income or Loss
        // GloBE Income or Loss = Net Accounting Profit/Loss
        // + Covered Tax (current + deferred)
        // - Excluded Dividends
        // - Excluded Equity Gains/Losses
        // + Non-Deductible Expenses (add back if expensed)
        // + Government Fines/Penalties (add back if expensed)
        // - Fair Value Adjustments (exclude if gains)
        // - Tax Transparent Entity Income (exclude if income)
        let calculatedGloBEIncomeLoss =
            parseFloat(netAccountingProfitLoss) +
            parseFloat(coveredTaxCurrent) +
            parseFloat(coveredTaxDeferred) -
            parseFloat(excludedDividends) -
            parseFloat(excludedEquityGainsLosses) +
            parseFloat(nonDeductibleExpenses) +
            parseFloat(governmentFinesPenalties) +
            parseFloat(fairValueAdjustments) -
            parseFloat(taxTransparentEntityIncome);

        setGloBEIncomeLoss(calculatedGloBEIncomeLoss);

        // Step 3: Calculate Adjusted Covered Tax (Simplified)
        // For simplicity, we'll assume Adjusted Covered Tax is primarily the current covered tax
        // plus/minus some adjustments. The actual PMK has detailed rules for this.
        let calculatedAdjustedCoveredTax = parseFloat(coveredTaxCurrent) + parseFloat(coveredTaxDeferred);

        setAdjustedCoveredTax(calculatedAdjustedCoveredTax);

        // Step 4: Calculate Effective Tax Rate (ETR)
        let calculatedETR = 0;
        if (calculatedGloBEIncomeLoss > 0) {
            calculatedETR = calculatedAdjustedCoveredTax / calculatedGloBEIncomeLoss;
        }
        setEffectiveTaxRate(calculatedETR);

        // Step 5: Calculate Top-up Tax
        let calculatedTopUpTax = 0;
        if (calculatedGloBEIncomeLoss > 0 && calculatedETR < GLOBAL_MINIMUM_TAX_RATE) {
            calculatedTopUpTax = (GLOBAL_MINIMUM_TAX_RATE - calculatedETR) * calculatedGloBEIncomeLoss;
        }
        setTopUpTax(calculatedTopUpTax);
    };

    // Helper function to format numbers as currency (for IDR values)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2 }).format(value);
    };

    // Helper function to format percentages
    const formatPercentage = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'percent', minimumFractionDigits: 2 }).format(value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-8 font-inter text-gray-800">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10 border border-green-200 relative">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-800 mb-8 leading-tight">
                    Perhitungan Pajak Minimum Global (Simplified)
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Model penyederhanaan berdasarkan PMK 136/2024. Masukkan nilai-nilai di bawah untuk melihat perhitungan.
                </p>

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-green-50 p-5 rounded-lg shadow-inner border border-green-100">
                        <h2 className="text-xl font-semibold text-green-700 mb-4">Input Data Keuangan</h2>
                        <div className="space-y-4">
                            {/* Consolidated Revenue is now in EUR */}
                            <div>
                                <label htmlFor="consolidatedRevenue" className="block text-sm font-medium text-gray-700">
                                    Peredaran Bruto Konsolidasi Tahunan (EUR):
                                </label>
                                <input
                                    type="number"
                                    id="consolidatedRevenue"
                                    value={consolidatedRevenue}
                                    onChange={(e) => setConsolidatedRevenue(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`Minimal ${REVENUE_THRESHOLD_EUR} EUR`}
                                />
                            </div>
                            <div>
                                <label htmlFor="netAccountingProfitLoss" className="block text-sm font-medium text-gray-700">
                                    Laba/Rugi Bersih Akuntansi Keuangan (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="netAccountingProfitLoss"
                                    value={netAccountingProfitLoss}
                                    onChange={(e) => setNetAccountingProfitLoss(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 1000000000"
                                />
                            </div>
                            <div>
                                <label htmlFor="coveredTaxCurrent" className="block text-sm font-medium text-gray-700">
                                    Pajak Tercakup (Pajak Kini) (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="coveredTaxCurrent"
                                    value={coveredTaxCurrent}
                                    onChange={(e) => setCoveredTaxCurrent(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 150000000"
                                />
                            </div>
                            <div>
                                <label htmlFor="coveredTaxDeferred" className="block text-sm font-medium text-gray-700">
                                    Pajak Tercakup (Pajak Tangguhan) (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="coveredTaxDeferred"
                                    value={coveredTaxDeferred}
                                    onChange={(e) => setCoveredTaxDeferred(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 20000000"
                                />
                            </div>
                            <div>
                                <label htmlFor="excludedDividends" className="block text-sm font-medium text-gray-700">
                                    Dividen yang Dikecualikan (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="excludedDividends"
                                    value={excludedDividends}
                                    onChange={(e) => setExcludedDividends(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 50000000"
                                />
                            </div>
                            <div>
                                <label htmlFor="excludedEquityGainsLosses" className="block text-sm font-medium text-gray-700">
                                    Keuntungan/Kerugian Ekuitas yang Dikecualikan (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="excludedEquityGainsLosses"
                                    value={excludedEquityGainsLosses}
                                    onChange={(e) => setExcludedEquityGainsLosses(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 10000000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-5 rounded-lg shadow-inner border border-green-100">
                        <h2 className="text-xl font-semibold text-green-700 mb-4">Penyesuaian Lainnya (dalam IDR)</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="nonDeductibleExpenses" className="block text-sm font-medium text-gray-700">
                                    Biaya yang Tidak Dapat Dikurangkan (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="nonDeductibleExpenses"
                                    value={nonDeductibleExpenses}
                                    onChange={(e) => setNonDeductibleExpenses(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 5000000"
                                />
                            </div>
                            <div>
                                <label htmlFor="governmentFinesPenalties" className="block text-sm font-medium text-gray-700">
                                    Denda/Penalti Pemerintah (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="governmentFinesPenalties"
                                    value={governmentFinesPenalties}
                                    onChange={(e) => setGovernmentFinesPenalties(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 2000000"
                                />
                            </div>
                            <div>
                                <label htmlFor="fairValueAdjustments" className="block text-sm font-medium text-gray-700">
                                    Penyesuaian Nilai Wajar (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="fairValueAdjustments"
                                    value={fairValueAdjustments}
                                    onChange={(e) => setFairValueAdjustments(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 3000000"
                                />
                            </div>
                            <div>
                                <label htmlFor="taxTransparentEntityIncome" className="block text-sm font-medium text-gray-700">
                                    Penghasilan Entitas Transparan Pajak (IDR):
                                </label>
                                <input
                                    type="number"
                                    id="taxTransparentEntityIncome"
                                    value={taxTransparentEntityIncome}
                                    onChange={(e) => setTaxTransparentEntityIncome(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Contoh: 4000000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculation Results Section */}
                <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200">
                    <h2 className="text-2xl font-bold text-green-800 mb-5 text-center">Hasil Perhitungan GMT</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium text-gray-700">Threshold Peredaran Bruto (EUR):</span>
                            <span className={`font-bold ${isThresholdMet ? 'text-green-600' : 'text-red-600'}`}>
                                {isThresholdMet ? 'Terpenuhi' : 'Tidak Terpenuhi'}
                            </span>
                        </div>

                        {!isThresholdMet && (
                            <p className="text-red-600 text-center font-semibold mt-4">
                                Perhitungan GMT tidak berlaku karena threshold peredaran bruto tidak terpenuhi.
                            </p>
                        )}

                        {isThresholdMet && (
                            <>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium text-gray-700">Laba atau Rugi GloBE:</span>
                                    <span className="font-bold text-green-700">{formatCurrency(gloBEIncomeLoss)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium text-gray-700">Pajak Tercakup yang Disesuaikan:</span>
                                    <span className="font-bold text-green-700">{formatCurrency(adjustedCoveredTax)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium text-gray-700">Tarif Pajak Efektif (ETR):</span>
                                    <span className={`font-bold ${effectiveTaxRate < GLOBAL_MINIMUM_TAX_RATE ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatPercentage(effectiveTaxRate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-bold text-lg text-gray-800">Pajak Tambahan (Top-up Tax):</span>
                                    <span className="font-bold text-lg text-emerald-700">{formatCurrency(topUpTax)}</span>
                                </div>
                                {topUpTax > 0 && (
                                    <p className="text-orange-600 text-center text-sm mt-2">
                                        Pajak Tambahan ini akan dikenakan jika ETR di bawah {formatPercentage(GLOBAL_MINIMUM_TAX_RATE)}.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-10 p-5 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
                    <h3 className="font-semibold text-gray-700 mb-2">Catatan Penting:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Aplikasi ini adalah model **penyederhanaan** untuk tujuan edukasi dan demonstrasi.</li>
                        <li>Perhitungan Pajak Minimum Global (GloBE Rules) dalam PMK 136/2024 sangat kompleks dan melibatkan banyak penyesuaian detail yang tidak tercakup sepenuhnya di sini.</li>
                        <li>Untuk perhitungan pajak yang akurat dan kepatuhan, selalu merujuk pada teks lengkap PMK 136/2024 dan berkonsultasi dengan Konsultan Pajak Terdaftar.</li>
                    </ul>
                </div>

                {/* Author Name */}
                <div className="text-right text-sm text-gray-500 mt-4">
                    Wirahman
                </div>
            </div>
        </div>
    );
};

export default App;
