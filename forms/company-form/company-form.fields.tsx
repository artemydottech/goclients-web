'use client';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TextField } from '@/components/shared/text-field';
import { TIMEZONES } from './company-form.constants';
import type { CompanyFormFieldsProps } from './company-form.types';

const CompanyFormFields = ({ control }: CompanyFormFieldsProps) => (
  <>
    <TextField control={control} name="name" label="Название" />
    <TextField
      control={control}
      name="address"
      label="Адрес"
      placeholder="Город, улица, дом"
    />
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField
        control={control}
        name="schedule"
        label="Часы работы"
        placeholder="Ежедневно 10:00–21:00"
      />
      <div className="grid gap-2">
        <Label htmlFor="timezone">Часовой пояс</Label>
        <Controller
          control={control}
          name="timezone"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="timezone" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField
        control={control}
        name="site"
        label="Сайт"
        type="url"
        placeholder="https://"
      />
      <TextField
        control={control}
        name="logo"
        label="Ссылка на логотип"
        type="url"
        placeholder="https://"
      />
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <TextField
        control={control}
        name="telegram"
        label="Telegram"
        placeholder="@salon"
      />
      <TextField
        control={control}
        name="vk"
        label="ВКонтакте"
        placeholder="vk.com/salon"
      />
      <TextField
        control={control}
        name="whatsapp"
        label="WhatsApp"
        type="tel"
        placeholder="+7 900 000-00-00"
      />
    </div>
  </>
);

export default CompanyFormFields;
