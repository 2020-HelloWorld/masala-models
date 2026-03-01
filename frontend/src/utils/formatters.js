export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export function formatDateTime(date) {
    return new Date(date).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatNumber(num, decimals = 1) {
    if (num === null || num === undefined) return '—';
    return Number(num).toFixed(decimals);
}

export function formatPercentage(num) {
    if (num === null || num === undefined) return '—';
    return `${Number(num).toFixed(1)}%`;
}

export function formatCurrency(num) {
    if (num === null || num === undefined) return '—';
    return `₹${Number(num).toLocaleString('en-IN')}`;
}
