import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import culSharifImg from "@/assets/CulSharif.png";
import bolgarImg from "@/assets/BolgarWhiteMosque.png";
import complimentImg from "@/assets/compliment.png";
import TatarDivider from "@/components/TatarDivider";

const categories = [
{ id: 1, name: "КАЗАНЬ", image: "/lovable-uploads/38732f60-96e6-4455-bfde-82cbb5339eca.png" },
{ id: 2, name: "ТАТАРСТАН", image: "/lovable-uploads/a3a17e9a-296f-4ae3-b746-2e81255674fa.png" }];

const products = [
{ id: 1, name: "Белый камень с крестом и полумесяцем", price: "3900 ₽", description: "Экскурсия по Казанскому кремлю с посещением внутри соборной мечети и 500-летнего храма; подаётся под соусом из исторических фактов и древних легенд.", details: "Подача: пешком 2 часа\nВходной билет на объект: 190р/гость\nБлюдо рассчитано на 1-4 гостя\nДобавка: 900₽/гость" },
{ id: 2, name: "Свияжск", price: "200 ₽", description: "Остров-град Свияжск — жемчужина Татарстана, основанная Иваном Грозным в 1551 году. Уникальный историко-архитектурный комплекс, включённый в список Всемирного наследия ЮНЕСКО, с древними монастырями и храмами на живописном острове." },
{ id: 3, name: "Татарская слобода", price: "3900 ₽", description: "Променадная прогулка по древним татарским улочкам между ажурных цветных домиков; подаётся под культурно-традиционным соусом с привкусом гастрономических татарских изысков.", details: "Подача: пешком 2 часа\nВходные билеты не требуются\nБлюдо рассчитано на 1-4 гостя\nДобавка: 900₽/гость" },
{ id: 4, name: "Раифский монастырь", price: "400 ₽", description: "Раифский Богородицкий монастырь — одна из самых почитаемых обителей Татарстана, основанная в XVII веке на берегу живописного озера. Блюдо передаёт атмосферу умиротворения и духовной чистоты этого святого места." },
{ id: 5, name: "Туфелька Сююмбике", price: "3900 ₽", description: "Блюдо про любовь, мудрость и жертвенность татарской царицы; прогулка по её жизненному пути подаётся с перчинкой интимных подробностей и окутывается вуалью неразгаданных тайн.", details: "Подача: пешком 2 часа\nВходной билет на объект: 300р/гость\nБлюдо рассчитано на 1-4 гостя\nДобавка: 900р/гость" },
{ id: 6, name: "Болгар", price: "600 ₽", description: "Блюдо, посвящённое древнему городу Болгар — столице Волжской Булгарии. Это кулинарное произведение отражает богатое наследие булгарской цивилизации, объединяя восточные пряности и традиционные рецепты Поволжья." },
{ id: 7, name: "Муха на окне", price: "4900 ₽", description: "Мини-экскурсия по обоим берегам Казани \"мухой\"; подаётся со смесью юмора, вкусных фактов и ложкой дёгтя.", details: "Подача: на авто 1,5-2 часа\nБилеты не требуются\nБлюдо рассчитано на 4 гостей" },
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
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());

  const handleCheckboxChange = (productId: number, checked: boolean) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (checked) next.add(productId);else
      next.delete(productId);
      return next;
    });
  };

  const [isSending, setIsSending] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOrderClick = () => {
    if (selectedProducts.size === 0) return;
    setShowPhoneDialog(true);
  };

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Введите номер телефона');
      return;
    }

    const selected = products.filter((p) => selectedProducts.has(p.id));
    setIsSending(true);
    setShowPhoneDialog(false);
    try {
      const { data, error } = await supabase.functions.invoke('send-telegram', {
        body: {
          products: selected.map(p => ({ name: p.name, price: p.price })),
          phone: phoneNumber.trim(),
        },
      });

      if (error) throw error;

      toast.success('Заказ отправлен!');
      setSelectedProducts(new Set());
      setPhoneNumber("");
    } catch (err) {
      console.error('Send error:', err);
      toast.error('Ошибка отправки заказа');
    } finally {
      setIsSending(false);
    }
  };

  const leftProducts = products.filter((_, i) => i % 2 === 0);
  const rightProducts = products.filter((_, i) => i % 2 === 1);

  const handleCardClick = (id: number) => {
    setExpandedId((prev) => prev === id ? null : id);
  };

  const renderProductCard = (product: typeof products[0]) => {
    const isExpanded = expandedId === product.id;
    return (
      <Card
        key={product.id}
        className="overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-md"
        onClick={() => handleCardClick(product.id)}>
        
        <CardContent className="p-0">
          <div className="relative h-28 bg-muted">
            <label
              className="absolute top-2 right-2 flex items-center gap-1.5 z-10 cursor-pointer"
              onClick={(e) => e.stopPropagation()}>
              
              <span className="text-[10px] font-medium text-foreground bg-background/80 backdrop-blur-sm rounded px-1 py-0.5">
                Выбрать
              </span>
              <Checkbox
                checked={selectedProducts.has(product.id)}
                onCheckedChange={(checked) => handleCheckboxChange(product.id, !!checked)}
                className="h-5 w-5 rounded-full border-2 border-primary bg-background/80 backdrop-blur-sm data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
              
            </label>
          </div>
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
              maxHeight: isExpanded ? "400px" : "0px",
              opacity: isExpanded ? 1 : 0
            }}>
            
            <div className="px-3 pb-3">
              <p className="text-xs leading-relaxed text-secondary-foreground">
                {product.description}
              </p>
              {"details" in product && product.details &&
              <>
                  <hr className="my-2 border-border" />
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.details}
                  </p>
                </>
              }
            </div>
          </div>
        </CardContent>
      </Card>);

  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-[12px] py-[24px]">
        {/* Header */}
        <header className="flex flex-col items-center mb-6 relative">
          {/* Top bar with logo and phone */}
          <div className="flex items-center justify-between w-full mb-3">
            <div className="h-10 w-10 rounded-full bg-primary" />
            <a href="tel:+70000000000" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-5 w-5" />
            </a>
          </div>

          {/* Ornamental top flourish */}
          <svg viewBox="0 0 200 24" className="w-32 h-6 text-primary opacity-40 mb-1" fill="currentColor">
            <path d="M100,2 C105,0 108,4 110,8 C112,4 115,0 120,2 C115,6 112,10 110,14 C108,10 105,6 100,2Z" />
            <path d="M100,2 C95,0 92,4 90,8 C88,4 85,0 80,2 C85,6 88,10 90,14 C92,10 95,6 100,2Z" />
            <path d="M100,14 L100,22" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="100" cy="23" r="1.2" />
            {/* Side vines */}
            <path d="M80,2 C72,1 65,4 60,3" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
            <path d="M120,2 C128,1 135,4 140,3" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
            <circle cx="58" cy="3" r="1" opacity="0.4" />
            <circle cx="142" cy="3" r="1" opacity="0.4" />
          </svg>

          {/* Main title */}
          <h1 className="text-center leading-tight">
            <span className="block text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Тур-кафе
            </span>
            <span className="block text-4xl font-black tracking-wide text-primary mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              СӘЯХӘТ
            </span>
            <span className="block text-xs tracking-[0.2em] text-muted-foreground mt-0.5 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              путешествие
            </span>
          </h1>

          {/* Ornamental bottom flourish */}
          <svg viewBox="0 0 240 20" className="w-48 h-5 text-accent opacity-30 mt-2" fill="currentColor">
            {/* Center diamond */}
            <path d="M120,4 L124,10 L120,16 L116,10Z" />
            {/* Left tulip bud */}
            <path d="M90,10 C92,6 95,5 97,7 C95,9 93,10 90,10Z" opacity="0.6" />
            <path d="M90,10 C92,14 95,15 97,13 C95,11 93,10 90,10Z" opacity="0.6" />
            {/* Right tulip bud */}
            <path d="M150,10 C148,6 145,5 143,7 C145,9 147,10 150,10Z" opacity="0.6" />
            <path d="M150,10 C148,14 145,15 143,13 C145,11 147,10 150,10Z" opacity="0.6" />
            {/* Connecting lines */}
            <line x1="97" y1="10" x2="116" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
            <line x1="124" y1="10" x2="143" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
            {/* Outer dots */}
            <circle cx="85" cy="10" r="1.2" opacity="0.3" />
            <circle cx="155" cy="10" r="1.2" opacity="0.3" />
            <line x1="60" y1="10" x2="85" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="155" y1="10" x2="180" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          </svg>

          {/* Subtitle */}
          <p className="text-center text-muted-foreground mt-3 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px' }}>
            Меню нашего туристического кафе.<br />Выбирайте по вкусу!
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button asChild className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="tel:+7000000000"><Phone className="h-4 w-4" />​ПОЗВОНИТЬ</a>
          </Button>
          <Button
            variant="secondary"
            className="flex-1 rounded-xl text-primary"
            onClick={handleOrderClick}
            disabled={selectedProducts.size === 0 || isSending}>
            
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
            {isSending ? 'ОТПРАВКА...' : 'ЗАКАЗАТЬ'}
          </Button>
        </div>

        <TatarDivider />

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

        <TatarDivider />

        {/* Products */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 flex flex-col gap-3">
            {leftProducts.map(renderProductCard)}
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {rightProducts.map(renderProductCard)}
          </div>
        </div>

        <TatarDivider />

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

        <TatarDivider />

        {/* Special Offer */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Спецпредложение
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Main Offer - spans 3 rows */}
            <Card className="row-span-3 overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="h-full min-h-[280px] bg-cover bg-center flex items-start justify-center" style={{ backgroundImage: "url(\"/lovable-uploads/cf59ad3e-b85e-41ef-aedd-6126644b3c2d.png\")" }}>
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
        {/* Phone Number Dialog */}
        <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Введите номер телефона</DialogTitle>
              <DialogDescription>
                Укажите ваш номер телефона для связи по заказу
              </DialogDescription>
            </DialogHeader>
            <Input
              type="tel"
              placeholder="+7 (900) 000-00-00"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-lg"
            />
            <Button
              onClick={handleSubmit}
              disabled={!phoneNumber.trim() || isSending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSending ? 'Отправка...' : 'Отправить заказ'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>);

};

export default Index;