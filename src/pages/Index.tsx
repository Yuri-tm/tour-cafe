import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const categories = [
{ id: 1, name: "КАЗАНЬ" },
{ id: 2, name: "ТАТАРСТАН" }];

const products = [
{ id: 1, name: "Сююмбике", price: "100 ₽" },
{ id: 2, name: "Свияжск", price: "200 ₽" },
{ id: 3, name: "Ханское золото", price: "300 ₽" },
{ id: 4, name: "Раифский монастырь", price: "400 ₽" },
{ id: 5, name: "Продукт 5", price: "500 ₽" },
{ id: 6, name: "Болгар", price: "600 ₽" },
{ id: 7, name: "Продукт 7", price: "700 ₽" },
{ id: 8, name: "Продукт 8", price: "800 ₽" },
{ id: 9, name: "Продукт 9", price: "900 ₽" },
{ id: 10, name: "Продукт 10", price: "1000 ₽" },
{ id: 11, name: "Продукт 11", price: "1100 ₽" },
{ id: 12, name: "Продукт 12", price: "1200 ₽" },
{ id: 13, name: "Продукт 13", price: "1300 ₽" },
{ id: 14, name: "Продукт 14", price: "1400 ₽" }];


const personalities = [
{ id: 1, name: "Персона 1", details: "Подробности" },
{ id: 2, name: "Персона 2", details: "Подробности" },
{ id: 3, name: "Персона 3", details: "Подробности" },
{ id: 4, name: "Персона 4", details: "Подробности" },
{ id: 5, name: "Персона 5", details: "Подробности" },
{ id: 6, name: "Персона 6", details: "Подробности" }];


const offers = [
{ id: 1, title: "Деталь предложения 1" },
{ id: 2, title: "Деталь предложения 2" },
{ id: 3, title: "Деталь предложения 3" }];


const Index = () => {
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
            <a href="tel:+7000000000">​ПОЗВОНИТЬ</a>
          </Button>
          <Button variant="secondary" className="flex-1 rounded-xl text-emerald-600">
            ЗАКАЗАТЬ
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((cat) => <Card key={cat.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-24 bg-muted" />
                <p className="p-3 text-sm font-medium text-card-foreground">
                  {cat.name}
                </p>
              </CardContent>
            </Card>)}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {products.map((product) => <Card key={product.id} className="overflow-hidden">
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
              </CardContent>
            </Card>)}
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
                <div className="h-full min-h-[280px] bg-muted" />
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