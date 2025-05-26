export async function load() {
    // Harus return array, misalnya:
    const data = [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' }
    ];
  
    return { data }; // <== nama 'data' harus cocok
  }