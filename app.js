import { supabase } from './supabaseClient.js'

// 1. Проверка: залогинен ли пользователь?
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
        // Если нет сессии — отправляем на вход
        window.location.href = 'login.html'
    } else {
        // Если есть — показываем интерфейс
        document.getElementById('app').style.display = 'block'
        document.getElementById('userEmail').textContent = session.user.email
    }
}

checkAuth()

// 2. Логика выхода
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    window.location.href = 'login.html'
})

// 3. Обработка CSV файла
document.getElementById('csvFile').addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (!file) return

    Papa.parse(file, {
        header: true, // Первая строка - заголовки
        skipEmptyLines: true,
        complete: function(results) {
            console.log("Данные из CSV:", results.data)
            calculateStats(results.data)
        }
    })
})

// 4. Математика (Прибыль и Маржа)
function calculateStats(data) {
    let income = 0
    let expense = 0

    // Проходим по каждой строке файла
    data.forEach(row => {
        // Предполагаем, что в CSV есть колонки: "Тип" и "Сумма"
        // Приводим сумму к числу, заменяя запятые на точки если нужно
        let amount = parseFloat(row['Сумма'].replace(',', '.'))
        let type = row['Тип'].toLowerCase().trim() // доход или расход

        if (isNaN(amount)) return

        if (type.includes('доход') || type.includes('income')) {
            income += amount
        } else if (type.includes('расход') || type.includes('expense')) {
            expense += amount
        }
    })

    const profit = income - expense
    // Формула маржи: (Прибыль / Выручка) * 100
    const margin = income > 0 ? ((profit / income) * 100).toFixed(2) : 0

    // Вывод на экран
    document.getElementById('totalIncome').textContent = income.toFixed(2) + ' BYN'
    document.getElementById('totalExpense').textContent = expense.toFixed(2) + ' BYN'
    document.getElementById('netProfit').textContent = profit.toFixed(2) + ' BYN'
    
    const marginEl = document.getElementById('margin')
    marginEl.textContent = margin + '%'
    
    // Красим прибыль
    if (profit > 0) marginEl.style.color = 'green'
    else marginEl.style.color = 'red'

    document.getElementById('results').classList.remove('hidden')
}