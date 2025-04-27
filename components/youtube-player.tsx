"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"

interface YouTubePlayerProps {
  videoId: string
  onComplete?: () => void
  autoplay?: boolean
}

export function YouTubePlayer({ videoId, onComplete, autoplay = false }: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = loadVideo
    } else {
      loadVideo()
    }

    return () => {
      // Clean up
      if (player) {
        player.destroy()
      }
    }
  }, [videoId])

  const loadVideo = () => {
    if (player) {
      player.loadVideoById(videoId)
      return
    }

    const newPlayer = new window.YT.Player("youtube-player", {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    })

    setPlayer(newPlayer)
  }

  const onPlayerReady = (event: any) => {
    setIsLoaded(true)
  }

  const onPlayerStateChange = (event: any) => {
    // Video ended
    if (event.data === 0 && onComplete) {
      onComplete()
    }
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="h-12 w-12" />
        </div>
      )}
      <div id="youtube-player" className="h-full w-full"></div>
    </div>
  )
}
