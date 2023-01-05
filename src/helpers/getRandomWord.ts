let words: string[] = [
    'COMPUTADORA',
    'CELULAR',
    'TABLET',
    'CARRO',
    'VETERINARIO',
    'TELEFONO'
]
export const getRandomWord = () => {
    const randomIndex = ( Math.floor(Math.random() * words.length));
    return words[randomIndex];
}
