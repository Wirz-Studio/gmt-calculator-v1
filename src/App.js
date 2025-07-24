import React, { useState, useEffect, useCallback } from 'react';

// Translations object for Internationalization (i18n)
const translations = {
    id: {
        title: "Perhitungan Pajak Minimum Global (Sederhana)", // Updated
        subtitle: "Model penyederhanaan berdasarkan PMK 136/2024. Masukkan nilai-nilai di bawah untuk melihat perhitungan.",
        inputSectionTitle: "Input Data Keuangan",
        consolidatedRevenueLabel: "Peredaran Bruto Konsolidasi Tahunan (EUR):",
        consolidatedRevenuePlaceholder: "Minimal",
        netAccountingProfitLossLabel: "Laba/Rugi Bersih Akuntansi Keuangan (IDR):",
        netAccountingProfitLossPlaceholder: "Contoh:",
        coveredTaxCurrentLabel: "Pajak Tercakup (Pajak Kini) (IDR):",
        coveredTaxCurrentPlaceholder: "Contoh:",
        coveredTaxDeferredLabel: "Pajak Tercakup (Pajak Tangguhan) (IDR):",
        coveredTaxDeferredPlaceholder: "Contoh:",
        excludedDividendsLabel: "Dividen yang Dikecualikan (IDR):",
        excludedDividendsPlaceholder: "Contoh:",
        excludedEquityGainsLossesLabel: "Keuntungan/Kerugian Ekuitas yang Dikecualikan (IDR):",
        excludedEquityGainsLossesPlaceholder: "Contoh:",
        otherAdjustmentsTitle: "Penyesuaian Lainnya (dalam IDR)",
        nonDeductibleExpensesLabel: "Biaya yang Tidak Dapat Dikurangkan (IDR):",
        nonDeductibleExpensesPlaceholder: "Contoh:",
        governmentFinesPenaltiesLabel: "Denda/Penalti Pemerintah (IDR):",
        governmentFinesPenaltiesPlaceholder: "Contoh:",
        fairValueAdjustmentsLabel: "Penyesuaian Nilai Wajar (IDR):",
        fairValueAdjustmentsPlaceholder: "Contoh:",
        taxTransparentEntityIncomeLabel: "Penghasilan Entitas Transparan Pajak (IDR):",
        taxTransparentEntityIncomePlaceholder: "Contoh:",
        qrtcAmountLabel: "QRTC (Qualified Refundable Tax Credits) (IDR):",
        qrtcAmountPlaceholder: "Contoh:",
        nonDeductibleIntraGroupFinancingLabel: "Biaya Pembiayaan Intra Grup Tidak Dapat Dikurangkan (IDR):",
        nonDeductibleIntraGroupFinancingPlaceholder: "Contoh:",
        portfolioDividendsElectionLabel: "Pilih: Masukkan Dividen Saham Portofolio",
        equityInvestmentInclusionElectionLabel: "Pilih: Masukkan Keuntungan/Kerugian Investasi Ekuitas & Entitas Transparan Pajak",
        calculationResultsTitle: "Hasil Perhitungan GMT",
        thresholdRevenueLabel: "Threshold Peredaran Bruto (EUR):",
        thresholdMet: "Terpenuhi",
        thresholdNotMet: "Tidak Terpenuhi",
        gmtNotApplicable: "Perhitungan GMT tidak berlaku karena threshold peredaran bruto tidak terpenuhi.",
        gloBEIncomeLossLabel: "Laba atau Rugi GloBE:",
        adjustedCoveredTaxLabel: "Pajak Tercakup yang Disesuaikan:",
        effectiveTaxRateLabel: "Tarif Pajak Efektif (ETR):",
        topUpTaxLabel: "Pajak Tambahan (Top-up Tax):",
        topUpTaxNote: "Pajak Tambahan ini akan dikenakan jika ETR di bawah",
        importantNotesTitle: "Catatan Penting:",
        note1: "Aplikasi ini adalah <span class='font-bold'>model penyederhanaan</span> untuk tujuan edukasi dan demonstrasi.", // Bolded
        note2: "Perhitungan Pajak Minimum Global (GloBE Rules) dalam PMK 136/2024 sangat kompleks dan melibatkan banyak penyesuaian detail yang tidak tercakup sepenuhnya di sini.",
        note3Title: "Penyesuaian umum yang Disimulasikan:", // Updated
        note3_1: "QRTC (Qualified Refundable Tax Credits): Diperlakukan sebagai penghasilan.",
        note3_2: "Biaya Pembiayaan Intra Grup yang Tidak Dapat Dikurangkan: Ditambahkan kembali ke laba GloBE.",
        note3_3: "Pilihan Dividen Saham Portofolio: Jika dipilih, dividen ini akan dimasukkan dalam laba GloBE (tidak dikecualikan).",
        note3_4: "Pilihan Investasi Ekuitas & Entitas Transparan Pajak: Jika dipilih, keuntungan/kerugian ekuitas dan penghasilan entitas transparan pajak akan dimasukkan dalam laba GloBE (tidak dikecualikan).",
        note4Title: "Penyesuaian Umum yang Tidak Disimulasikan dikarenakan Kompleksitasnya:", // Updated
        note4_1: "<span class='font-bold'>Prinsip Kewajaran dan Kelaziman Usaha (Arm's Length Principle) & Harga Transfer (Transfer Pricing)</span>", // Simplified
        note4_2: "<span class='font-bold'>Instrumen Lindung Nilai (Hedging Instrument)</span>", // Simplified
        note4_3: "<span class='font-bold'>Ketentuan Khusus Nilai Wajar Keuntungan/Kerugian Kepentingan Kepemilikan</span>", // Simplified
        note4_5: "<span class='font-bold'>Pelepasan Kepentingan Kepemilikan</span>", // Simplified
        note4_6: "<span class='font-bold'>Penyesuaian Pajak Tercakup Khusus untuk Pemilihan Investasi Ekuitas</span>", // Simplified
        note5: "Untuk perhitungan pajak yang akurat dan kepatuhan, selalu merujuk pada teks lengkap PMK 136/2024 dan berkonsultasi dengan Konsultan Pajak Terdaftar.",
        author: "Harry Wirahman",
        languageButton: "English",
        currencyIDR: "IDR",
        currencyEUR: "EUR",
        resetButton: "Reset" // Added reset button text
    },
    en: {
        title: "Global Minimum Tax Calculation (Simplified)", // Updated from Simple to Simplified
        subtitle: "A simplified model based on PMK 136/2024. Enter values below to see the calculation.",
        inputSectionTitle: "Financial Data Input",
        consolidatedRevenueLabel: "Annual Consolidated Revenue (EUR):",
        consolidatedRevenuePlaceholder: "Minimum",
        netAccountingProfitLossLabel: "Net Financial Accounting Profit/Loss (IDR):",
        netAccountingProfitLossPlaceholder: "Example:",
        coveredTaxCurrentLabel: "Covered Tax (Current Tax) (IDR):",
        coveredTaxCurrentPlaceholder: "Example:",
        coveredTaxDeferredLabel: "Covered Tax (Deferred Tax) (IDR):",
        coveredTaxDeferredPlaceholder: "Example:",
        excludedDividendsLabel: "Excluded Dividends (IDR):",
        excludedDividendsPlaceholder: "Example:",
        excludedEquityGainsLossesLabel: "Excluded Equity Gains/Losses (IDR):",
        excludedEquityGainsLossesPlaceholder: "Example:",
        otherAdjustmentsTitle: "Other Adjustments (in IDR)",
        nonDeductibleExpensesLabel: "Non-Deductible Expenses (IDR):",
        nonDeductibleExpensesPlaceholder: "Example:",
        governmentFinesPenaltiesLabel: "Government Fines/Penalties (IDR):",
        governmentFinesPenaltiesPlaceholder: "Example:",
        fairValueAdjustmentsLabel: "Fair Value Adjustments (IDR):",
        fairValueAdjustmentsPlaceholder: "Example:",
        taxTransparentEntityIncomeLabel: "Tax Transparent Entity Income (IDR):",
        taxTransparentEntityIncomePlaceholder: "Example:",
        qrtcAmountLabel: "QRTC (Qualified Refundable Tax Credits) (IDR):",
        qrtcAmountPlaceholder: "Example:",
        nonDeductibleIntraGroupFinancingLabel: "Non-Deductible Intra-Group Financing Expenses (IDR):",
        nonDeductibleIntraGroupFinancingPlaceholder: "Example:",
        // Changed "Elect" to "Checked"
        portfolioDividendsElectionLabel: "Checked: Include Portfolio Share Dividends",
        equityInvestmentInclusionElectionLabel: "Checked: Include Equity Investment Gains/Losses & Tax Transparent Entity Income",
        calculationResultsTitle: "GMT Calculation Results",
        thresholdRevenueLabel: "Revenue Threshold (EUR):",
        thresholdMet: "Met",
        thresholdNotMet: "Not Met",
        gmtNotApplicable: "GMT calculation is not applicable as the revenue threshold is not met.",
        gloBEIncomeLossLabel: "GloBE Income or Loss:",
        adjustedCoveredTaxLabel: "Adjusted Covered Tax:",
        effectiveTaxRateLabel: "Effective Tax Rate (ETR):",
        topUpTaxLabel: "Top-up Tax:",
        topUpTaxNote: "This Top-up Tax will be imposed if the ETR is below",
        importantNotesTitle: "Important Notes:",
        note1: "This application is a <span class='font-bold'>simplified model</span> for educational and demonstration purposes.", // Bolded
        note2: "The Global Minimum Tax (GloBE Rules) calculations in PMK 136/2024 are highly complex and involve many detailed adjustments not fully covered here.",
        note3Title: "Simulated General Adjustments:", // Updated
        note3_1: "Treated as income.", // Confirmed English
        note3_2: "Added back to GloBE income.", // Confirmed English
        note3_3: "If checked, these dividends will be included in GloBE income (not excluded).", // Confirmed English
        note3_4: "If checked, equity gains/losses and tax transparent entity income will be included in GloBE income (not excluded).", // Confirmed English
        note4Title: "Non Simulated General Adjustments due to Complexity:", // Updated from Not Simulated to Non Simulated
        note4_1: "<span class='font-bold'>Arm's Length Principle & Transfer Pricing</span>", // Simplified
        note4_2: "<span class='font-bold'>Hedging Instruments</span>", // Simplified
        note4_3: "<span class='font-bold'>Specific Provisions for Fair Value Gains/Losses on Equity Interests</span>", // Simplified
        note4_5: "<span class='font-bold'>Disposal of Equity Interests</span>", // Simplified
        note4_6: "<span class='font-bold'>Specific Covered Tax Adjustments for Equity Investment Election</span>", // Simplified
        note5: "For accurate tax calculations and compliance, always refer to the full text of PMK 136/2024 and consult with a Registered Tax Consultant.",
        author: "Harry Wirahman",
        languageButton: "Bahasa Indonesia",
        currencyIDR: "IDR",
        currencyEUR: "EUR",
        resetButton: "Reset" // Added reset button text
    }
};

// Main App component for the GMT Calculator
const App = () => {
    // State for language selection
    const [language, setLanguage] = useState('en'); // Changed default language to 'en'
    const t = translations[language]; // Get current translations

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

    // New inputs based on Pasal 21 PMK 136/2024 simplifications
    const [qrtcAmount, setQrtcAmount] = useState(0); // Qualified Refundable Tax Credits
    const [nonDeductibleIntraGroupFinancing, setNonDeductibleIntraGroupFinancing] = useState(0); // Biaya Pembiayaan Intra Grup yang Tidak Dapat Dikurangkan

    // New optional elections based on Pasal 21 PMK 136/2024 simplifications
    const [portfolioDividendsElection, setPortfolioDividendsElection] = useState(false); // Pemilihan Lima Tahun untuk Dividen dari Kepemilikan Saham Portofolio
    const [equityInvestmentInclusionElection, setEquityInvestmentInclusionElection] = useState(false); // Pemilihan Lima Tahun untuk Penyertaan Investasi Ekuitas

    // State variables for calculated results
    const [gloBEIncomeLoss, setGloBEIncomeLoss] = useState(0);
    const [adjustedCoveredTax, setAdjustedCoveredTax] = useState(0);
    const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
    const [topUpTax, setTopUpTax] = useState(0);
    const [isThresholdMet, setIsThresholdMet] = useState(false);

    // Constants for calculation
    const GLOBAL_MINIMUM_TAX_RATE = 0.15; // 15%
    const REVENUE_THRESHOLD_EUR = 750000000; // EUR 750 million (full value)

    // Function to toggle language
    const toggleLanguage = () => {
        setLanguage(prevLang => (prevLang === 'id' ? 'en' : 'id'));
    };

    // Function to reset all fields to their initial (zero) values
    const handleReset = () => {
        setNetAccountingProfitLoss(0);
        setCoveredTaxCurrent(0);
        setCoveredTaxDeferred(0);
        setExcludedDividends(0);
        setExcludedEquityGainsLosses(0);
        setNonDeductibleExpenses(0);
        setGovernmentFinesPenalties(0);
        setFairValueAdjustments(0);
        setTaxTransparentEntityIncome(0);
        setConsolidatedRevenue(0);
        setQrtcAmount(0);
        setNonDeductibleIntraGroupFinancing(0);
        setPortfolioDividendsElection(false);
        setEquityInvestmentInclusionElection(false);
        // Results will automatically recalculate to zero due to useEffect dependency on inputs
    };

    // Function to perform the GMT calculation, wrapped in useCallback
    const calculateGMT = useCallback(() => {
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
        // - Excluded Dividends (conditional)
        // - Excluded Equity Gains/Losses (conditional)
        // + Non-Deductible Expenses (add back if expensed)
        // + Government Fines/Penalties (add back if expensed)
        // + Fair Value Adjustments (add back if gains)
        // - Tax Transparent Entity Income (conditional)
        // + QRTC (Qualified Refundable Tax Credits)
        // + Non-Deductible Intra-Group Financing Expenses

        let calculatedGloBEIncomeLoss = parseFloat(netAccountingProfitLoss);

        // Add Covered Tax (current + deferred)
        calculatedGloBEIncomeLoss += parseFloat(coveredTaxCurrent) + parseFloat(coveredTaxDeferred);

        // Excluded Dividends (Pasal 21 Poin 5: Pemilihan Lima Tahun untuk Dividen dari Kepemilikan Saham Portofolio)
        if (!portfolioDividendsElection) {
            calculatedGloBEIncomeLoss -= parseFloat(excludedDividends);
        }

        // Excluded Equity Gains/Losses & Tax Transparent Entity Income (Pasal 21 Poin 6b: Pemilihan Lima Tahun untuk Penyertaan Investasi Ekuitas)
        if (!equityInvestmentInclusionElection) {
            calculatedGloBEIncomeLoss -= parseFloat(excludedEquityGainsLosses);
            calculatedGloBEIncomeLoss -= parseFloat(taxTransparentEntityIncome); // If income, subtracting means excluding it
        } else {
            // If election is active, these are included, so ensure they are not subtracted.
            // If taxTransparentEntityIncome was a loss, it would be added.
            // For simplicity in this simulator, we assume these are gains/income that were previously excluded.
            // If they are *now* included, they should not be subtracted.
        }

        // Add Non-Deductible Expenses
        calculatedGloBEIncomeLoss += parseFloat(nonDeductibleExpenses);
        calculatedGloBEIncomeLoss += parseFloat(governmentFinesPenalties);

        // Add Fair Value Adjustments (assuming these are gains to be included)
        calculatedGloBEIncomeLoss += parseFloat(fairValueAdjustments);

        // Add QRTC (Pasal 21 Poin 3a: QRTC diperlakukan sebagai penghasilan)
        calculatedGloBEIncomeLoss += parseFloat(qrtcAmount);

        // Add Non-Deductible Intra-Group Financing (Pasal 21 Poin 4)
        calculatedGloBEIncomeLoss += parseFloat(nonDeductibleIntraGroupFinancing);


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
        consolidatedRevenue,
        qrtcAmount,
        nonDeductibleIntraGroupFinancing,
        portfolioDividendsElection,
        equityInvestmentInclusionElection,
        // Setters are stable, so they typically don't need to be in useCallback's dependency array.
        // setIsThresholdMet, setGloBEIncomeLoss, setAdjustedCoveredTax, setEffectiveTaxRate, setTopUpTax
    ]);


    // Effect hook to recalculate whenever input values change
    // calculateGMT is now a stable function due to useCallback
    useEffect(() => {
        calculateGMT();
    }, [calculateGMT]); // Now only depends on the stable calculateGMT function

    // Helper function to format numbers as currency (for IDR values)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2 }).format(value);
    };

    // Helper function to format percentages
    const formatPercentage = (value) => {
        return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-8 font-inter text-gray-800">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10 border border-green-200 relative">
                {/* Language and Reset Buttons */}
                <div className="flex justify-end gap-2 mb-4"> {/* Added gap for spacing */}
                    <button
                        onClick={toggleLanguage}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        {t.languageButton}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        {t.resetButton}
                    </button>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-800 mb-8 leading-tight">
                    {t.title}
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    {t.subtitle}
                </p>

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-green-50 p-5 rounded-lg shadow-inner border border-green-100">
                        <h2 className="text-xl font-semibold text-green-700 mb-4">{t.inputSectionTitle}</h2>
                        <div className="space-y-4">
                            {/* Consolidated Revenue is now in EUR */}
                            <div>
                                <label htmlFor="consolidatedRevenue" className="block text-sm font-medium text-gray-700">
                                    {t.consolidatedRevenueLabel}
                                </label>
                                <input
                                    type="number"
                                    id="consolidatedRevenue"
                                    value={consolidatedRevenue}
                                    onChange={(e) => setConsolidatedRevenue(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.consolidatedRevenuePlaceholder} ${REVENUE_THRESHOLD_EUR} ${t.currencyEUR}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="netAccountingProfitLoss" className="block text-sm font-medium text-gray-700">
                                    {t.netAccountingProfitLossLabel}
                                </label>
                                <input
                                    type="number"
                                    id="netAccountingProfitLoss"
                                    value={netAccountingProfitLoss}
                                    onChange={(e) => setNetAccountingProfitLoss(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.netAccountingProfitLossPlaceholder} 1000000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="coveredTaxCurrent" className="block text-sm font-medium text-gray-700">
                                    {t.coveredTaxCurrentLabel}
                                </label>
                                <input
                                    type="number"
                                    id="coveredTaxCurrent"
                                    value={coveredTaxCurrent}
                                    onChange={(e) => setCoveredTaxCurrent(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.coveredTaxCurrentPlaceholder} 150000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="coveredTaxDeferred" className="block text-sm font-medium text-gray-700">
                                    {t.coveredTaxDeferredLabel}
                                </label>
                                <input
                                    type="number"
                                    id="coveredTaxDeferred"
                                    value={coveredTaxDeferred}
                                    onChange={(e) => setCoveredTaxDeferred(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.coveredTaxDeferredPlaceholder} 20000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="excludedDividends" className="block text-sm font-medium text-gray-700">
                                    {t.excludedDividendsLabel}
                                </label>
                                <input
                                    type="number"
                                    id="excludedDividends"
                                    value={excludedDividends}
                                    onChange={(e) => setExcludedDividends(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.excludedDividendsPlaceholder} 50000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="excludedEquityGainsLosses" className="block text-sm font-medium text-gray-700">
                                    {t.excludedEquityGainsLossesLabel}
                                </label>
                                <input
                                    type="number"
                                    id="excludedEquityGainsLosses"
                                    value={excludedEquityGainsLosses}
                                    onChange={(e) => setExcludedEquityGainsLosses(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.excludedEquityGainsLossesPlaceholder} 10000000`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-5 rounded-lg shadow-inner border border-green-100">
                        <h2 className="text-xl font-semibold text-green-700 mb-4">{t.otherAdjustmentsTitle}</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="nonDeductibleExpenses" className="block text-sm font-medium text-gray-700">
                                    {t.nonDeductibleExpensesLabel}
                                </label>
                                <input
                                    type="number"
                                    id="nonDeductibleExpenses"
                                    value={nonDeductibleExpenses}
                                    onChange={(e) => setNonDeductibleExpenses(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.nonDeductibleExpensesPlaceholder} 5000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="governmentFinesPenalties" className="block text-sm font-medium text-gray-700">
                                    {t.governmentFinesPenaltiesLabel}
                                </label>
                                <input
                                    type="number"
                                    id="governmentFinesPenalties"
                                    value={governmentFinesPenalties}
                                    onChange={(e) => setGovernmentFinesPenalties(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.governmentFinesPenaltiesPlaceholder} 2000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="fairValueAdjustments" className="block text-sm font-medium text-gray-700">
                                    {t.fairValueAdjustmentsLabel}
                                </label>
                                <input
                                    type="number"
                                    id="fairValueAdjustments"
                                    value={fairValueAdjustments}
                                    onChange={(e) => setFairValueAdjustments(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.fairValueAdjustmentsPlaceholder} 3000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="taxTransparentEntityIncome" className="block text-sm font-medium text-gray-700">
                                    {t.taxTransparentEntityIncomeLabel}
                                </label>
                                <input
                                    type="number"
                                    id="taxTransparentEntityIncome"
                                    value={taxTransparentEntityIncome}
                                    onChange={(e) => setTaxTransparentEntityIncome(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.taxTransparentEntityIncomePlaceholder} 4000000`}
                                />
                            </div>
                            {/* NEW INPUTS FROM PASAL 21 */}
                            <div>
                                <label htmlFor="qrtcAmount" className="block text-sm font-medium text-gray-700">
                                    {t.qrtcAmountLabel}
                                </label>
                                <input
                                    type="number"
                                    id="qrtcAmount"
                                    value={qrtcAmount}
                                    onChange={(e) => setQrtcAmount(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.qrtcAmountPlaceholder} 1000000`}
                                />
                            </div>
                            <div>
                                <label htmlFor="nonDeductibleIntraGroupFinancing" className="block text-sm font-medium text-gray-700">
                                    {t.nonDeductibleIntraGroupFinancingLabel}
                                </label>
                                <input
                                    type="number"
                                    id="nonDeductibleIntraGroupFinancing"
                                    value={nonDeductibleIntraGroupFinancing}
                                    onChange={(e) => setNonDeductibleIntraGroupFinancing(parseFloat(e.target.value) || 0)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder={`${t.nonDeductibleIntraGroupFinancingPlaceholder} 500000`}
                                />
                            </div>
                            {/* NEW TOGGLES FROM PASAL 21 */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="portfolioDividendsElection"
                                    checked={portfolioDividendsElection}
                                    onChange={(e) => setPortfolioDividendsElection(e.target.checked)}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="portfolioDividendsElection" className="ml-2 block text-sm font-medium text-gray-700">
                                    {t.portfolioDividendsElectionLabel}
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="equityInvestmentInclusionElection"
                                    checked={equityInvestmentInclusionElection}
                                    onChange={(e) => setEquityInvestmentInclusionElection(e.target.checked)}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="equityInvestmentInclusionElection" className="ml-2 block text-sm font-medium text-gray-700">
                                    {t.equityInvestmentInclusionElectionLabel}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculation Results Section */}
                <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200">
                    <h2 className="text-2xl font-bold text-green-800 mb-5 text-center">{t.calculationResultsTitle}</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium text-gray-700">{t.thresholdRevenueLabel}</span>
                            <span className={`font-bold ${isThresholdMet ? 'text-green-600' : 'text-red-600'}`}>
                                {isThresholdMet ? t.thresholdMet : t.thresholdNotMet}
                            </span>
                        </div>

                        {!isThresholdMet && (
                            <p className="text-red-600 text-center font-semibold mt-4">
                                {t.gmtNotApplicable}
                            </p>
                        )}

                        {isThresholdMet && (
                            <>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium text-gray-700">{t.gloBEIncomeLossLabel}</span>
                                    <span className="font-bold text-green-700">{formatCurrency(gloBEIncomeLoss)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium text-gray-700">{t.adjustedCoveredTaxLabel}</span>
                                    <span className="font-bold text-green-700">{formatCurrency(adjustedCoveredTax)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium text-gray-700">{t.effectiveTaxRateLabel}</span>
                                    <span className={`font-bold ${effectiveTaxRate < GLOBAL_MINIMUM_TAX_RATE ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatPercentage(effectiveTaxRate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-bold text-lg text-gray-800">{t.topUpTaxLabel}</span>
                                    <span className="font-bold text-lg text-emerald-700">{formatCurrency(topUpTax)}</span>
                                </div>
                                {topUpTax > 0 && (
                                    <p className="text-orange-600 text-center text-sm mt-2">
                                        {t.topUpTaxNote} {formatPercentage(GLOBAL_MINIMUM_TAX_RATE)}.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-10 p-5 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
                    <h3 className="font-semibold text-gray-700 mb-2">{t.importantNotesTitle}</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li dangerouslySetInnerHTML={{ __html: t.note1 }}></li>
                        <li>{t.note2}</li>
                        <li><span className="font-bold">{t.note3Title}</span>
                            <ul className="list-circle list-inside ml-4">
                                <li><span className="font-bold">QRTC (Qualified Refundable Tax Credits):</span> {t.note3_1}</li>
                                <li><span className="font-bold">Non-Deductible Intra-Group Financing Expenses:</span> {t.note3_2}</li>
                                <li><span className="font-bold">Portfolio Share Dividends Election:</span> {t.note3_3}</li>
                                <li><span className="font-bold">Equity Investment & Tax Transparent Entity Income Election:</span> {t.note3_4}</li>
                            </ul>
                        </li>
                        <li><span className="font-bold">{t.note4Title}</span>
                            <ul className="list-circle list-inside ml-4">
                                {/* Using dangerouslySetInnerHTML to render HTML string */}
                                <li dangerouslySetInnerHTML={{ __html: t.note4_1 }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_2 }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_3 }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_5 }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_6 }}></li>
                            </ul>
                        </li>
                        <li>{t.note5}</li>
                    </ul>
                </div>

                {/* Author Name */}
                <div className="text-right text-sm text-gray-500 mt-4">
                    <a
                        href="https://www.linkedin.com/in/wirahman/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        {t.author}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default App;
