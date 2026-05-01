export function BasePage({ title, items = [], renderItem, modal }) {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">{title}</h1>

      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full`}
      >
        {items.map((item) => renderItem(item))}
      </div>
      {modal}
    </div>
  );
}
