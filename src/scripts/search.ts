const queryElement = document.querySelector('.search-query');
const countElement = document.querySelector('.search-count');
const listItems = [...document.querySelectorAll('.unit-list-item')];

queryElement?.addEventListener('input', (e) => {
  const query = e?.target?.value ?? '';
  window.history.replaceState(
    null,
    document.title,
    location.href.replace(/\?.*/, '') + `?q=${query}`
  );
  search(false);
});

const search = (restore: boolean) => {
  const query = new URLSearchParams(location.search).get('q') ?? '';
  if (restore) {
    queryElement.value = query;
  }

  let count = 0;
  listItems.forEach((item) => {
    if (!query || item.textContent?.includes(query)) {
      item.classList.remove('d-none');
      count++;
    } else {
      item.classList.add('d-none');
    }
  });

  countElement.textContent = count;
};

search(true);
