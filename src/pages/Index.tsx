import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const categories = [
{ id: 1, name: "Категория 1" },
{ id: 2, name: "Категория 2" }];


const products = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  name: `Продукт ${i + 1}`,
  price: `${(i + 1) * 100} ₽`
}));

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
        <p className="text-center text-muted-foreground mb-4">Subtitle Text</p>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button className="flex-1 rounded-xl">Button 1</Button>
          <Button variant="secondary" className="flex-1 rounded-xl">
            Button 2
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
          <h2 className="text-lg font-bold text-foreground mb-4">Персоны</h2>
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