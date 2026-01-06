'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Book, Save } from "lucide-react";
import Link from "next/link";
import { journalStore } from "@/lib/storage/journal-store";
import { moodStore } from "@/lib/storage/mood-store";

// Local date formatter (single source of truth)
const formatLocalDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function JournalPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [content, setContent] = useState("");
  const [savedEntries, setSavedEntries] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const todayMood = typeof window !== "undefined"
    ? moodStore.getTodayMood()
    : null;

  // Load entry when date changes
  useEffect(() => {
    const dateKey = formatLocalDate(selectedDate);
    const entry = journalStore.getEntryByDate(dateKey);
    setContent(entry ? entry.content : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  // Load saved dates on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSavedEntries(journalStore.getAllDates());
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSave = () => {
    if (!content.trim()) return;

    journalStore.saveEntry(
      content.trim(),
      todayMood || undefined,
      selectedDate
    );

    setSavedEntries(journalStore.getAllDates());
    setIsSaved(true);

    setTimeout(() => setIsSaved(false), 2000);
  };

  const isToday = (date: Date) => {
    return formatLocalDate(date) === formatLocalDate(new Date());
  };

  const hasEntry = (date: Date) => {
    return savedEntries.includes(formatLocalDate(date));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-purple-600 hover:text-purple-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold text-purple-900">Journal</h2>
      </div>

      {/* Mood Indicator */}
      {todayMood && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm">
          <strong>Today&apos;s mood:</strong> {todayMood}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="text-purple-900">Select Date</CardTitle>
            <CardDescription className="text-purple-700">
              View or edit past entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={(date) => date > new Date()}
              modifiers={{ hasEntry }}
              modifiersStyles={{
                hasEntry: { backgroundColor: "#dbeafe", fontWeight: "bold" },
              }}
            />
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="text-purple-900 flex items-center gap-2">
              <Book className="w-5 h-5" />
              {isToday(selectedDate) ? "Today's Entry" : "Entry"}
            </CardTitle>
            <CardDescription className="text-purple-700">
              {selectedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here. No judgment, just honesty."
              className="min-h-[200px] border-2 border-purple-200 focus:border-purple-400"
            />

            {selectedDate <= new Date() && (
              <Button
                onClick={handleSave}
                disabled={!content.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
            )}

            {isSaved && (
              <div className="bg-green-50 border border-green-200 rounded p-2 text-green-800 text-sm text-center">
                ✓ Entry saved successfully
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
