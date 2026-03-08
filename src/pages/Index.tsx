import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import culSharifImg from "@/assets/CulSharif.png";
import bolgarImg from "@/assets/BolgarWhiteMosque.png";
import complimentImg from "@/assets/compliment.png";

const categories = [
{ id: 1, name: "КАЗАНЬ", image: culSharifImg },
{ id: 2, name: "ТАТАРСТАН", image: bolgarImg }];

const products = [
{ id: 1, name: "Белый камень с крестом и полумесяцем", price: "100 ₽", description: "Уникальный символ единства двух религий — креста и полумесяца, высеченный на древнем белом камне. Этот артефакт олицетворяет многовековую историю мирного сосуществования народов Татарстана и их духовных традиций." },
{ id: 2, name: "Свияжск", price: "200 ₽", description: "Остров-град Свияжск — жемчужина Татарстана, основанная Иваном Грозным в 1551 году. Уникальный историко-архитектурный комплекс, включённый в список Всемирного наследия ЮНЕСКО, с древними монастырями и храмами на живописном острове." },
{ id: 3, name: "Ханское золото", price: "300 ₽", description: "Блюдо, вдохновлённое роскошью Казанского ханства. Изысканное сочетание традиционных татарских специй и благородных ингредиентов создаёт неповторимый вкус, достойный ханского стола. Настоящее кулинарное путешествие во времени." },
{ id: 4, name: "Раифский монастырь", price: "400 ₽", description: "Раифский Богородицкий монастырь — одна из самых почитаемых обителей Татарстана, основанная в XVII веке на берегу живописного озера. Блюдо передаёт атмосферу умиротворения и духовной чистоты этого святого места." },
{ id: 5, name: "Продукт 5", price: "500 ₽", description: "Авторское блюдо от шеф-повара, созданное по старинным рецептам татарской кухни с использованием местных сезонных продуктов. Каждый ингредиент тщательно подобран для создания гармоничного и запоминающегося вкусового впечатления." },
{ id: 6, name: "Болгар", price: "600 ₽", description: "Блюдо, посвящённое древнему городу Болгар — столице Волжской Булгарии. Это кулинарное произведение отражает богатое наследие булгарской цивилизации, объединяя восточные пряности и традиционные рецепты Поволжья." },
{ id: 7, name: "Продукт 7", price: "700 ₽", description: "Изысканное блюдо, вдохновлённое красотой природы Татарстана. Свежие локальные продукты, приготовленные с мастерством и любовью, раскрывают глубину и разнообразие татарской кулинарной традиции в каждом кусочке." },
{ id: 8, name: "Продукт 8", price: "800 ₽", description: "Премиальное блюдо из коллекции шеф-повара. Уникальное сочетание текстур и вкусов, созданное на стыке традиционной татарской кухни и современных кулинарных техник. Подаётся с авторским соусом из местных трав." },
{ id: 9, name: "Продукт 9", price: "900 ₽", description: "Сезонное блюдо, меняющееся в зависимости от времени года. Шеф-повар использует только лучшие продукты текущего сезона, чтобы создать неповторимое гастрономическое впечатление, отражающее ритм природы Поволжья." },
{ id: 10, name: "Продукт 10", price: "1000 ₽", description: "Фирменное блюдо тур-кафе «Сәяхәт», ставшее визитной карточкой заведения. Сложная рецептура, передаваемая из поколения в поколение, делает это блюдо настоящим кулинарным шедевром татарской гастрономии." },
{ id: 11, name: "Продукт 11", price: "1100 ₽", description: "Деликатесное блюдо для истинных ценителей высокой кухни. Редкие ингредиенты и авторская подача превращают каждую порцию в произведение искусства, которое радует не только вкус, но и взгляд гостя." },
{ id: 12, name: "Продукт 12", price: "1200 ₽", description: "Праздничное блюдо, идеально подходящее для особых случаев и торжеств. Щедрая порция, богатый вкус и эффектная подача создают атмосферу настоящего татарского застолья с его гостеприимством и щедростью." },
{ id: 13, name: "Продукт 13", price: "1300 ₽", description: "Эксклюзивное блюдо ограниченной серии, доступное только по предварительному заказу. Шеф-повар лично контролирует каждый этап приготовления, гарантируя безупречное качество и незабываемые впечатления." },
{ id: 14, name: "Продукт 14", price: "1400 ₽", description: "Гранд-блюдо коллекции — вершина кулинарного мастерства нашего шеф-повара. Сочетание премиальных ингредиентов, сложных техник приготовления и авторской философии создаёт поистине уникальный гастрономический опыт." }];


const personalities = [
{ id: 1, name: "Руслан Валиев", details: "шеф-повар" },
{ id: 2, name: "Ольга Валиева", details: "су-шеф" },
{ id: 3, name: "Персона 3", details: "Подробности" },
{ id: 4, name: "Персона 4", details: "Подробности" },
{ id: 5, name: "Персона 5", details: "Подробности" },
{ id: 6, name: "Персона 6", details: "Подробности" }];


const offers = [
{ id: 1, title: "Алабрыс" },
{ id: 2, title: "Килән" },
{ id: 3, title: "Кучтәнәч" }];


const Index = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const leftProducts = products.filter((_, i) => i % 2 === 0);
  const rightProducts = products.filter((_, i) => i % 2 === 1);

  const handleCardClick = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderProductCard = (product: typeof products[0]) => {
    const isExpanded = expandedId === product.id;
    return (
      <Card
        key={product.id}
        className="overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-md"
        onClick={() => handleCardClick(product.id)}
      >
        <CardContent className="p-0">
          <div className="h-28 bg-muted" />
          <div className="p-3">
            <p className="text-sm font-medium text-card-foreground">
              {product.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {product.price}
            </p>
          </div>
          <div
            className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
            style={{
              maxHeight: isExpanded ? "200px" : "0px",
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <div className="px-3 pb-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <h1 className="font-bold text-foreground text-center py-[10px] px-[10px] text-2xl">Тур-кафе


СӘЯХӘТ

(путешествие)

          </h1>
          <a href="tel:+70000000000" className="text-muted-foreground">
            <Phone className="h-5 w-5" />
          </a>
        </header>

        {/* Subtitle */}
        <p className="text-center text-muted-foreground mb-4"><p className="text-center text-muted-foreground mb-4">Выбери блюда из меню</p></p>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button asChild className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
            <a href="tel:+7000000000"><Phone className="h-4 w-4" />​ПОЗВОНИТЬ</a>
          </Button>
          <Button variant="secondary" className="flex-1 rounded-xl text-emerald-600">
            <Phone className="h-4 w-4" />
            ЗАКАЗАТЬ
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((cat) => <Card key={cat.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${cat.image})` }} />
                <p className="p-3 text-sm font-medium text-card-foreground">
                  {cat.name}
                </p>
              </CardContent>
            </Card>)}
        </div>

        {/* Products */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 flex flex-col gap-3">
            {leftProducts.map(renderProductCard)}
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {rightProducts.map(renderProductCard)}
          </div>
        </div>
        </div>

        {/* Personalities */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Наш повар и его комманда</h2>
          <div className="grid grid-cols-2 gap-3">
            {personalities.map((person) => <Card key={person.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-28 bg-muted rounded-t-lg" />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-card-foreground">
                      {person.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {person.details}
                    </p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Special Offer */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Спецпредложение
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Main Offer - spans 3 rows */}
            <Card className="row-span-3 overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="h-full min-h-[280px] bg-cover bg-center flex items-start justify-center" style={{ backgroundImage: `url(${complimentImg})` }}>
                  <h3 className="text-lg font-bold text-white text-center px-3 py-2 bg-black/40 w-full backdrop-blur-sm">КОМПЛИМЕНТ от шеф-повара</h3>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-card-foreground">
                    Главное предложение
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Offer Details */}
            {offers.map((offer) => <Card key={offer.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-20 bg-muted" />
                  <p className="p-2 text-sm font-medium text-card-foreground">
                    {offer.title}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>);

};

export default Index;