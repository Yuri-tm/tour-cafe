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
import kulSharifNoBgImg from "@/assets/kulSharif_noBG.png";

const categories = [
{ id: 1, name: "КАЗАНЬ", image: "/lovable-uploads/38732f60-96e6-4455-bfde-82cbb5339eca.png" },
{ id: 2, name: "ТАТАРСТАН", image: "/lovable-uploads/a3a17e9a-296f-4ae3-b746-2e81255674fa.png" }];

const products = [
{ id: 1, name: "Белый камень с крестом и полумесяцем", price: "3900 ₽", description: "Экскурсия по Казанскому кремлю с посещением внутри соборной мечети и 500-летнего храма; подаётся под соусом из исторических фактов и древних легенд.", details: "Подача: пешком 2 часа\nВходной билет на объект: 190р/гость\nБлюдо рассчитано на 1-4 гостя\nДобавка: 900₽/гость" },
{ id: 2, name: "Свияжск", price: "200 ₽", description: "Остров-град Свияжск — жемчужина Татарстана, основанная Иваном Грозным в 1551 году. Уникальный историко-архитектурный комплекс, включённый в список Всемирного наследия ЮНЕСКО, с древними монастырями и храмами на живописном острове.", details: "" },
{ id: 3, name: "Татарская слобода", price: "3900 ₽", description: "Променадная прогулка по древним татарским улочкам между ажурных цветных домиков; подаётся под культурно-традиционным соусом с привкусом гастрономических татарских изысков.", details: "Подача: пешком 2 часа\nВходные билеты не требуются\nБлюдо рассчитано на 1-4 гостя\nДобавка: 900₽/гость" },
{ id: 4, name: "Раифский монастырь", price: "400 ₽", description: "Раифский Богородицкий монастырь — одна из самых почитаемых обителей Татарстана, основанная в XVII веке на берегу живописного озера. Блюдо передаёт атмосферу умиротворения и духовной чистоты этого святого места.", details: "" },
{ id: 5, name: "Туфелька Сююмбике", price: "3900 ₽", description: "Блюдо про любовь, мудрость и жертвенность татарской царицы; прогулка по её жизненному пути подаётся с перчинкой интимных подробностей и окутывается вуалью неразгаданных тайн.", details: "Подача: пешком 2 часа\nВходной билет на объект: 300р/гость\nБлюдо рассчитано на 1-4 гостя\nДобавка: 900р/гость" },
{ id: 6, name: "Болгар", price: "600 ₽", description: "Блюдо, посвящённое древнему городу Болгар — столице Волжской Булгарии. Это кулинарное произведение отражает богатое наследие булгарской цивилизации, объединяя восточные пряности и традиционные рецепты Поволжья.", details: "" },
{ id: 7, name: "Муха на окне", price: "4900 ₽", description: "Мини-экскурсия по обоим берегам Казани \"мухой\"; подаётся со смесью юмора, вкусных фактов и ложкой дёгтя.", details: "Подача: на авто 1,5-2 часа\nБилеты не требуются\nБлюдо рассчитано на 4 гостей" },
{ id: 8, name: "По следам Зиланта", price: "9990 ₽", description: "Классический круг по исторической части Казани с акцентами на основных вехах истории и легендарных местах; блюдо сдобрено посещением «Белого камня» для полноты вкуса и аутентичной татарской подачей.", details: "Подача: автомобильно-пешеходная\nДлительность: 4 часа\nВходной билет на объект 190р/гость\nРазмер блюда: на 1-4 гостя" },
{ id: 9, name: "Казань на максималках", price: "17990 ₽", description: "Макси-блюдо по древнему городищу и современному мегаполису; разнообразие вкусов и ингредиентов гарантированно возбудит все 5 органов чувств.", details: "Длительность: 6 часов\nВходные билеты: включены\nДесерт: татарское чаепитие с выпечкой (включено)\nРазмер блюда: на 2-4 гостя" },
{ id: 10, name: "Вкусная татарская тарелка", price: "5990 ₽", description: "Блюдо от шеф-повара, которое создано для баловства рецепторов, восторга чувств и развития мелкой моторики каждого гостя; блюдо сдобрено мини мастер-классом по татарской выпечке.", details: "Подача: пешая\nДлительность: 2,5-3 часа\nСостав: кыстыбый, бульон, губудия, чак-чак, эчпочмак, вяленая конина, сырокопченая утка, баурсак, татарский чай\nРазмер блюда: на 1 гостя\nКоличество гостей: до 30 чел" },
{ id: 11, name: "💃Вечерний наряд Сююмбике", price: "5990 ₽", description: "Блюдо-послевкусие казанского дня; создано для неспешного наслаждения огнями вечерней иллюминации и приправлено лёгкой фотосессий с самыми яркими драгоценностями вечернего наряда города.", details: "Подача: автомобильно-пешеходная\nДлительность: 2,5-3 часа\nДесерт: Колесо обозрения «Вокруг света» (по желанию, билеты в кассе 550р/гость)\nРазмер блюда: на 1-4 гостя" },
{ id: 12, name: "Продукт 12", price: "1200 ₽", description: "Праздничное блюдо, идеально подходящее для особых случаев и торжеств. Щедрая порция, богатый вкус и эффектная подача создают атмосферу настоящего татарского застолья с его гостеприимством и щедростью.", details: "" },
{ id: 13, name: "Продукт 13", price: "1300 ₽", description: "Эксклюзивное блюдо ограниченной серии, доступное только по предварительному заказу. Шеф-повар лично контролирует каждый этап приготовления, гарантируя безупречное качество и незабываемые впечатления.", details: "" },
{ id: 14, name: "Продукт 14", price: "1400 ₽", description: "Гранд-блюдо коллекции — вершина кулинарного мастерства нашего шеф-повара. Сочетание премиальных ингредиентов, сложных техник приготовления и авторской философии создаёт поистине уникальный гастрономический опыт.", details: "" }];


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
          <div className="relative h-28 bg-transparent">
            <img src={kulSharifNoBgImg} alt="Кул-Шариф" className="w-full h-full object-cover" />
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
        <p className="text-center text-muted-foreground mb-4 font-semibold">Меню нашего туристического кафе.<br />Выбирайте по вкусу!</p>

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

        {/* Products */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 flex flex-col gap-3">
            {leftProducts.map(renderProductCard)}
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {rightProducts.map(renderProductCard)}
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
