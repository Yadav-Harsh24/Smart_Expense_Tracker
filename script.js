document.addEventListener("DOMContentLoaded", function () {

  let expenses = [];

  const data = [
    { title: "Lunch", category: "Food" },
    { title: "Dinner", category: "Food" },
    { title: "Groceries", category: "Food" },
    { title: "Coffee", category: "Food" },
    { title: "Petrol", category: "Travel" },
    { title: "Uber", category: "Travel" },
    { title: "Shopping", category: "Shopping" },
    { title: "Snacks", category: "Food" }
  ];

  expenses = data.map(function (item) {
    return {
      title: item.title,
      category: item.category,
      amount: Math.floor(Math.random() * 2000) + 100,
      date: new Date().toISOString().split("T")[0]
    };
  });

  show(expenses);

  function show(list) {
    const table = document.getElementById("table-body");
    table.innerHTML = "";

    list.forEach(function (e) {
      table.innerHTML += `
        <tr>
          <td>${e.title}</td>
          <td>${e.category}</td>
          <td>₹${e.amount}</td>
          <td>${e.date}</td>
        </tr>
      `;
    });
  }

  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const category = document.getElementById("category");

  function updateView() {
    let value = search.value.toLowerCase();

    let filtered = expenses.filter(function (e) {
      return e.title.toLowerCase().includes(value);
    });

    if (category.value !== "All") {
      filtered = filtered.filter(function (e) {
        return e.category === category.value;
      });
    }

    if (sort.value === "amount") {
      filtered.sort(function (a, b) {
        return a.amount - b.amount;
      });
    }

    if (sort.value === "date") {
      filtered.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    }

    show(filtered);
  }

  search.addEventListener("input", updateView);
  sort.addEventListener("change", updateView);
  category.addEventListener("change", updateView);
});