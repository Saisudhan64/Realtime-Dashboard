import { create } from 'zustand'

export interface Widget {
  id: string
  type: 'weather' | 'airQuality' | 'earthquake' | 'solar'
  x: number
  y: number
  w: number
  h: number
}

interface DashboardState {
  widgets: Widget[]
  addWidget: (widget: Widget) => void
  removeWidget: (id: string) => void
  updateWidgetLayout: (id: string, layout: Partial<Widget>) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  widgets: [
    { id: 'weather-1', type: 'weather', x: 0, y: 0, w: 4, h: 4 },
  ],
  addWidget: (widget) =>
    set((state) => ({ widgets: [...state.widgets, widget] })),
  removeWidget: (id) =>
    set((state) => ({ widgets: state.widgets.filter((w) => w.id !== id) })),
  updateWidgetLayout: (id, layout) =>
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, ...layout } : w
      ),
    })),
}))