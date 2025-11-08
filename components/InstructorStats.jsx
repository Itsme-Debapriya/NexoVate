"use client"

export function InstructorStats({ label, value, icon: Icon, trend }) {
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground-muted mb-1">{label}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
        {Icon && <Icon className="w-8 h-8 text-primary opacity-20" />}
      </div>
      {trend && <p className="text-xs text-green-600 mt-2">↑ {trend}</p>}
    </div>
  )
}
