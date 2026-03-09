#!/usr/bin/env python
"""
FastAPI Server Runner - Keeps the server running with error handling
"""
import subprocess
import time
import sys
import os

def run_server():
    """Run the FastAPI server"""
    print("=" * 60)
    print("Starting Certify.AI FastAPI Server...")
    print("=" * 60)
    
    max_retries = 5
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            # Run the app with uvicorn
            process = subprocess.Popen(
                [sys.executable, "-u", "-m", "uvicorn", "app:app", 
                 "--host", "0.0.0.0", "--port", "8000", "--reload"],
                stdout=sys.stdout,
                stderr=sys.stderr,
                cwd=os.path.dirname(os.path.abspath(__file__))
            )
            
            # Wait for the process
            process.wait()
            
            print(f"\n⚠️  Server stopped unexpectedly. Retrying... ({retry_count + 1}/{max_retries})")
            retry_count += 1
            time.sleep(2)
            
        except KeyboardInterrupt:
            print("\n\n✓ Server stopped by user")
            break
        except Exception as e:
            print(f"\n❌ Error running server: {e}")
            retry_count += 1
            time.sleep(2)
    
    if retry_count >= max_retries:
        print(f"\n❌ Failed to start server after {max_retries} attempts")
        sys.exit(1)

if __name__ == "__main__":
    run_server()
