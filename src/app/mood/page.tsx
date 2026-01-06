"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Smile, Frown, Meh } from "lucide-react";
import Link from "next/link";
import { moodStore } from "@/lib/storage/mood-store";

const MOOD_OPTIONS = [
  { value: "great", label: "Great", icon: Smile, color: "text-green-600" },
  { value: "good", label: "Good", icon: Smile, color: "text-emerald-600" },
  { value: "okay", label: "Okay", icon: Meh, color: "text-yellow-600" },
  { value: "down", label: "Down", icon: Frown, color: "text-orange-600" },
  { value: "struggling", label: "Struggling", icon: Frown, color: "text-red-600" }
];

export default function MoodCheckIn() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Initialize state with data from localStorage
  const [todayMood, setTodayMood] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return moodStore.getTodayMood();
    }
    return null;
  });

  const [selectedMood, setSelectedMood] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const existing = moodStore.getTodayMood();
      return existing || "";
    }
    return "";
  });

  const handleSave = () => {
    if (!selectedMood) return;
    
    moodStore.saveMood(selectedMood, note.trim() || undefined);
    setIsSaved(true);
    
    // Redirect to home after a moment
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  if (isSaved) {
    return (
      <div className="space-y-4">
        <Link href="/" className="text-purple-600 hover:text-purple-800 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>
        
        <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-green-900 text-2xl">✓ Mood Check-in Saved</CardTitle>
            <CardDescription className="text-green-700">
              Thank you for checking in with yourself today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-green-800 mb-4">
              Your emotional wellness matters. Remember, it is okay to have different feelings each day.
            </p>
            <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (todayMood) {
    return (
      <div className="space-y-4">
        <Link href="/" className="text-purple-600 hover:text-purple-800 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>
        
        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="text-purple-900">Already Checked In Today</CardTitle>
            <CardDescription className="text-purple-700">
              You rated today as: <strong>{todayMood}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-purple-800 mb-4">
              Would you like to update your mood for today?
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setTodayMood(null)} className="bg-purple-600 hover:bg-purple-700">
                Update Mood
              </Button>
              <Link href="/">
                <Button variant="outline">Return Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-purple-600 hover:text-purple-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold text-purple-900">Daily Mood Check-in</h2>
      </div>

      {/* Instructions */}
      <div className="bg-white/60 backdrop-blur border border-purple-100 rounded-lg p-4">
        <p className="text-purple-800 text-sm">
          Take a moment to check in with yourself. There is no right or wrong answer - just honest reflection.
        </p>
      </div>

      {/* Mood Selection */}
      <Card className="border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-900">How are you feeling today?</CardTitle>
            <CardDescription className="text-purple-700">
              Choose the mood that best describes how you are doing right now
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedMood} onValueChange={setSelectedMood}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your mood...">
                {selectedMood && (
                  <span className="flex items-center gap-2">
                    {(() => {
                      const option = MOOD_OPTIONS.find(o => o.value === selectedMood);
                      const Icon = option?.icon || Heart;
                      return <Icon className="w-4 h-4" />;
                    })()}
                    {MOOD_OPTIONS.find(o => o.value === selectedMood)?.label}
                  </span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MOOD_OPTIONS.map(option => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${option.color}`} />
                      {option.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {/* Optional Note */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-900">
              Optional: Add a note
            </label>
            <Textarea
              placeholder="What is on your mind today? (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border-2 border-purple-200 focus:border-purple-400 min-h-[100px]"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!selectedMood}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            Save Check-in
          </Button>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <h3 className="text-pink-900 font-medium mb-2">Why check in daily?</h3>
        <ul className="text-pink-800 text-sm space-y-1">
          <li>• Builds self-awareness</li>
          <li>• Tracks emotional patterns</li>
          <li>• Helps identify triggers</li>
          <li>• Celebrates your progress</li>
        </ul>
      </div>
    </div>
  );
}
