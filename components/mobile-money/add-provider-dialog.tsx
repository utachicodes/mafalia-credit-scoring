"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Smartphone } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface AddProviderDialogProps {
  onAdd: (provider: { name: string; account: string; type: string }) => void
}

export function AddProviderDialog({ onAdd }: AddProviderDialogProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    type: "",
  })

  const providerTypes = [
    { value: "wave", label: "Wave" },
    { value: "orange", label: "Orange Money" },
    { value: "free", label: "Free Money" },
    { value: "wari", label: "Wari" },
    { value: "other", label: t("mobileMoney.addProvider.other") },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.account && formData.type) {
      onAdd(formData)
      setFormData({ name: "", account: "", type: "" })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("mobileMoney.addProvider.button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            {t("mobileMoney.addProvider.title")}
          </DialogTitle>
          <DialogDescription>{t("mobileMoney.addProvider.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">{t("mobileMoney.addProvider.typeLabel")}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger id="type">
                <SelectValue placeholder={t("mobileMoney.addProvider.typePlaceholder") ?? undefined} />
              </SelectTrigger>
              <SelectContent>
                {providerTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t("mobileMoney.addProvider.nameLabel")}</Label>
            <Input
              id="name"
              placeholder={t("mobileMoney.addProvider.namePlaceholder") ?? undefined}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">{t("mobileMoney.addProvider.accountLabel")}</Label>
            <Input
              id="account"
              type="tel"
              placeholder={t("mobileMoney.addProvider.accountPlaceholder") ?? undefined}
              value={formData.account}
              onChange={(e) => setFormData({ ...formData, account: e.target.value })}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("mobileMoney.addProvider.submit")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

