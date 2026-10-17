
fetch('./source/source.txt')
    .then(res => res.text())
    .then(data => {
        const fragments = data.trim().split(/\r?\n/)

        return solution(fragments)
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })





function solution(fragments) {
    let longestLine = '';

    const byStart = new Map();

    for (let i = 0; i < fragments.length; i++) {
        const start = fragments[i].slice(0, 2);

        if (!byStart.has(start)) {
            byStart.set(start, []);
        }

        byStart.get(start).push(i);
    }

    const used = new Array(fragments.length).fill(false);

    // Кількість цифр, які додає кожен фрагмент
    const weights = fragments.map(fragment => fragment.length - 2);

    const totalWeight = weights.reduce(
        (sum, weight) => sum + weight,
        0
    );

    function searching(current, currentLine, remainingWeight) {
        if (currentLine.length > longestLine.length) {
            longestLine = currentLine;
        }

        // Верхня межа довжини можливого результату
        if (currentLine.length + remainingWeight <= longestLine.length) {
            return;
        }

        const end = current.slice(-2);
        const candidates = byStart.get(end) || [];

        for (const index of candidates) {
            if (used[index]) {
                continue;
            }

            const piece = fragments[index];

            used[index] = true;

            searching(
                piece,
                currentLine + piece.slice(2),
                remainingWeight - weights[index]
            );

            used[index] = false;
        }
    }

    for (let i = 0; i < fragments.length; i++) {
        used[i] = true;

        searching(
            fragments[i],
            fragments[i],
            totalWeight - weights[i]
        );

        used[i] = false;
    }

    return longestLine;
}



